import {Component, computed, inject} from '@angular/core';
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
import {MatPaginator} from '@angular/material/paginator';
import {NotificationRulesDisplayedColumnsTableEnum} from 'common/enums/tables';
import {NotificationRulesHttpService} from '@services/http';

/**
 * Component for displaying a list of notification rules.
 * It fetches notification rules from the server and displays them in a table.
 * @author dgutierrez
 */
@Component({
  selector: 'app-notification-rules-list',
  imports: [
    GeneralContainerComponent,
    MatButton,
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
export class NotificationRulesListPage {
  readonly i18nService = inject(I18nService);
  readonly tableService = inject(TableService);
  readonly notificationRulesHttpService = inject(NotificationRulesHttpService);

  readonly dataSource = computed(() => {
    return new MatTableDataSource(this.)
  })
  displayedColumns = [...Object.values(NotificationRulesDisplayedColumnsTableEnum)];

  navigateToEditRule(id: number) {

  }
}
