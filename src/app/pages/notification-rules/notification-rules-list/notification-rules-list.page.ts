import {Component, computed, inject, OnInit} from '@angular/core';
import {Constants} from '@common/constants/constants';
import {GeneralContainerComponent} from '@components/layout';
import {MatButton, MatIconButton} from '@angular/material/button';
import {TranslatePipe} from '@ngx-translate/core';
import {MatIcon} from '@angular/material/icon';
import {I18nService, TableService} from '@services/general';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable,
  MatTableDataSource
} from '@angular/material/table';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {NotificationRulesManagementDisplayedColumnsTableEnum} from 'common/enums/tables';
import {NotificationRulesHttpService} from '@services/http';
import {Router} from '@angular/router';
import {PagesUrlsEnum} from '@common/enums';

/**
 * Component for displaying a list of notification rules.
 * It fetches notification rules from the server and displays them in a table.
 * @author dgutierrez
 */
@Component({
  selector: 'app-notification-rules-list',
  imports: [
    GeneralContainerComponent,
    MatIcon,
    TranslatePipe,
    MatCell,
    MatCellDef,
    MatHeaderCell,
    MatHeaderRow,
    MatHeaderRowDef,
    MatIconButton,
    MatPaginator,
    MatRow,
    MatRowDef,
    MatTable,
    MatColumnDef,
    MatHeaderCellDef
  ],
  templateUrl: './notification-rules-list.page.html',
  styleUrl: './notification-rules-list.page.scss',
  changeDetection: Constants.changeDetectionStrategy
})
export class NotificationRulesListPage implements OnInit {
  readonly i18nService = inject(I18nService);
  readonly notificationRulesHttpService = inject(NotificationRulesHttpService);
  readonly tableService = inject(TableService);
  readonly router = inject(Router);

  readonly dataSource = computed(() => {
    return new MatTableDataSource(this.notificationRulesHttpService.configurationList());
  })

  ngOnInit() {
    this.notificationRulesHttpService.getAll();
  }

  displayedColumns = [...Object.values(NotificationRulesManagementDisplayedColumnsTableEnum)];

  navigateToEditRule(id: number) {
    this.router.navigate([PagesUrlsEnum.NOTIFICATION_RULES_EDIT, id]);
  }

  /**
   * Handles pagination changes for the notification rules table.
   * @param event The pagination event containing the new page index and size.
   * @author dgutierrez
   */
  onPageChange(event: PageEvent) {
    this.tableService.onPageChangeGeneric(
      event,
      this.notificationRulesHttpService.search,
      () => this.notificationRulesHttpService.getAll()
    );
  }
}
