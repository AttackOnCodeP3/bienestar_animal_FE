import {Component, computed, inject, OnInit} from '@angular/core';
import {Router} from '@angular/router';
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
import {MatIcon} from '@angular/material/icon';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {MatButtonModule} from '@angular/material/button';
import {TranslatePipe} from '@ngx-translate/core';
import {MunicipalityHttpService} from '@services/http';
import {PagesUrlsEnum} from '@common/enums';
import {MunicipalityManagementDisplayedColumnsTableEnum} from 'common/enums/tables';
import {GeneralContainerComponent} from '@components/layout';
import {I18nService, TableService} from '@services/general';

/**
 * Component for displaying a list of municipalities.
 * @author gjimenez
 * @modifiedby dgutierrez 12/07/2025 refactor for more clean code and adjustments in the form
 */
@Component({
  selector: 'app-municipality-list',
  templateUrl: './municipality-list.page.html',
  styleUrls: ['./municipality-list.page.scss'],
  imports: [
    GeneralContainerComponent,
    MatButtonModule,
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderCellDef,
    MatHeaderRow,
    MatHeaderRowDef,
    MatIcon,
    MatPaginator,
    MatRow,
    MatRowDef,
    MatTable,
    TranslatePipe,
  ]
})
export class MunicipalityListPage implements OnInit {
  private readonly router = inject(Router);
  readonly i18nService = inject(I18nService);
  readonly municipalityHttpService = inject(MunicipalityHttpService);
  readonly tableService = inject(TableService);

  dataSource = computed(() => {
    return new MatTableDataSource(this.municipalityHttpService.municipalityList());
  });

  readonly displayedColumns = [...Object.values(MunicipalityManagementDisplayedColumnsTableEnum)];

  ngOnInit(): void {
    this.municipalityHttpService.getAll();
  }

  /**
   * Navigates to the create municipality page.
   * @author gjimenez
   * @modifiedby dgutierrez 12/07/2025 refactor to use the PagesUrlsEnum for navigation
   */
  navigateToCreateMunicipality(): void {
    this.router.navigate([PagesUrlsEnum.MUNICIPALITY_CREATE]);
  }

  /**
   * Navigates to the edit municipality page.
   * @param id The ID of the municipality to edit.
   * @author gjimenez
   * @modifiedby dgutierrez 12/07/2025 refactor to use the PagesUrlsEnum for navigation
   */
  navigateToEditMunicipality(id: number): void {
    this.router.navigate([PagesUrlsEnum.MUNICIPALITY_EDIT, id]);
  }

  /**
   * Handles pagination changes for the municipality list.
   * @param event The pagination event containing the new page index and size.
   * @author dgutierrez
   */
  onPageChange(event: PageEvent) {
    this.tableService.onPageChangeGeneric(
      event,
      this.municipalityHttpService.search,
      () => this.municipalityHttpService.getAll()
    );
  }
}
