import {AfterViewInit, Component, computed, inject, OnInit, viewChild} from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatPaginator, MatPaginatorModule, PageEvent} from '@angular/material/paginator';
import {Constants} from '@common/constants/constants';
import {UserHttpService} from '@services/http';
import {User} from '@models';
import {MatSlideToggle, MatSlideToggleChange} from '@angular/material/slide-toggle';
import {UpdateUserRequestDto} from '@models/dto';
import {I18nService, TableService} from '@services/general';
import {TranslatePipe} from '@ngx-translate/core';
import {I18nBooleanPipe} from '@core/pipes';
import {AsyncPipe} from '@angular/common';

@Component({
  selector: 'app-user-management',
  imports: [MatTableModule, MatPaginatorModule, MatSlideToggle, TranslatePipe, I18nBooleanPipe, AsyncPipe],
  templateUrl: './user-management.page.html',
  styleUrl: './user-management.page.scss',
  changeDetection: Constants.changeDetectionStrategy
})
export class UserManagementPage implements OnInit, AfterViewInit {
  readonly i18nService = inject(I18nService);
  readonly tableService = inject(TableService);
  readonly userHttpService = inject(UserHttpService);
  paginator = viewChild.required(MatPaginator);

  displayedColumns: string[] = [
    ...Object.values(this.tableService.userManagementDisplayedColumnsTableEnum),
  ];
  dataSource = computed(() => {
    return new MatTableDataSource<User>(this.userHttpService.userList());
  })

  ngOnInit() {
    this.userHttpService.getAll();
  }

  ngAfterViewInit() {
    this.dataSource().paginator = this.paginator();
  }

  /**
   * Checks if the user is active.
   * @param user The user to check.
   */
  isActiveUser(user: User) {
    return user.active;
  }

  /**
   * Handles the toggle event for user activation status.
   * @param user The user whose activation status is being toggled.
   * @param event The event triggered by the toggle change.
   * @author dgutierrez
   */
  onToggle(user: User, event: MatSlideToggleChange) {
    const updatedActiveStatusUser = UpdateUserRequestDto.fromUser(new User({
      ...user,
      active: event.checked
    }));
    this.userHttpService.update(updatedActiveStatusUser);
  }

  /**
   * Handles pagination changes for the user list.
   * @param event The pagination event containing the new page index and size.
   * @author dgutierrez
   */
  onPageChange(event: PageEvent) {
    this.tableService.onPageChangeGeneric(
      event,
      this.userHttpService.search,
      () => this.userHttpService.getAll()
    );
  }
}
