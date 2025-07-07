import {AfterViewInit, Component, computed, inject, OnInit, viewChild} from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {Constants} from '@common/constants/constants';
import {UserHttpService} from '@services/http';
import {User} from '@models';
import {MatSlideToggle, MatSlideToggleChange} from '@angular/material/slide-toggle';
import {UpdateUserRequestDto} from '@models/dto';
import {I18nService, TableService} from '@services/general';
import {TranslatePipe} from '@ngx-translate/core';

@Component({
  selector: 'app-user-management',
  imports: [MatTableModule, MatPaginatorModule, MatSlideToggle, TranslatePipe],
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

  isActive(user: User) {
    return user.active;
  }

  onToggle(user: User, event: MatSlideToggleChange) {
    const updatedActiveStatusUser = UpdateUserRequestDto.fromUser(new User({
      ...user,
      active: event.checked
    }));
    this.userHttpService.update(updatedActiveStatusUser);
  }
}
