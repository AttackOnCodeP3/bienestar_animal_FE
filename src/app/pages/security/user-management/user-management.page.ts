import {AfterViewInit, Component, computed, inject, OnInit, viewChild} from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatPaginator, MatPaginatorModule, PageEvent} from '@angular/material/paginator';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {MatSlideToggle, MatSlideToggleChange} from '@angular/material/slide-toggle';
import {TranslatePipe} from '@ngx-translate/core';
import {Constants} from '@common/constants/constants';
import {UserHttpService} from '@services/http';
import {User} from '@models';
import {UpdateUserRequestDto} from '@models/dto';
import {I18nService, TableService} from '@services/general';
import {I18nBooleanPipe} from '@core/pipes';
import {AsyncPipe} from '@angular/common';
import {GeneralContainerComponent} from '@components/layout';
import {Router} from '@angular/router';
import {PagesUrlsEnum} from '@common/enums';

@Component({
  selector: 'app-user-management',
  imports: [
    AsyncPipe,
    GeneralContainerComponent,
    I18nBooleanPipe,
    MatButton,
    MatIcon,
    MatPaginatorModule,
    MatSlideToggle,
    MatTableModule,
    TranslatePipe,
    MatIconButton,
  ],
  templateUrl: './user-management.page.html',
  styleUrl: './user-management.page.scss',
  changeDetection: Constants.changeDetectionStrategy
})
export class UserManagementPage implements OnInit, AfterViewInit {
  private readonly router = inject(Router);
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

  /**
   * Navigates to the create user page.
   * @author dgutierrez
   */
  onNavigateToCreateUser() {
    this.router.navigate([PagesUrlsEnum.SECURITY_CREATE_USER])
  }

  /**
   * Navigates to the edit user page with the specified user ID.
   * @param userId The ID of the user to edit.
   * @author dgutierrez
   */
  onNavigateToEditUser(userId:number) {
    this.router.navigate([PagesUrlsEnum.SECURITY_EDIT_USER, userId]);
  }
}
