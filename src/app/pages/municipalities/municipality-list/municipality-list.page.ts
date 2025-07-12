import {Component, computed, inject, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {
  MatCell, MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef,
  MatRow, MatRowDef,
  MatTable, MatTableDataSource
} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import {MunicipalityHttpService} from '@services/http';
import {PagesUrlsEnum} from '@common/enums';
import {MunicipalityManagementDisplayedColumnsTableEnum} from 'common/enums/tables';
import {GeneralContainerComponent} from '@components/layout';
import {MatIcon} from '@angular/material/icon';
import {I18nService, TableService} from '@services/general';
import {TranslatePipe} from '@ngx-translate/core';

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
    MatRow,
    MatRowDef,
    MatTable,
    TranslatePipe,
  ]
})
export class MunicipalityListPage implements OnInit {
  private readonly municipalityHttpService = inject(MunicipalityHttpService);
  private readonly router = inject(Router);
  readonly tableService = inject(TableService);
  readonly i18nService = inject(I18nService);

  dataSource = computed(() => {
    return new MatTableDataSource(this.municipalityHttpService.municipalityList());
  });

  readonly displayedColumns = [...Object.values(MunicipalityManagementDisplayedColumnsTableEnum)];

  ngOnInit(): void {
    this.municipalityHttpService.getAll();
  }

  navigateToCreate(): void {
    this.router.navigate([PagesUrlsEnum.MUNICIPALITY_CREATE]);
  }

  navigateToEdit(id: number): void {
    this.router.navigate([PagesUrlsEnum.MUNICIPALITY_EDIT, id]);
  }

  delete(municipalityId: number): void {
    const municipality = this.municipalityHttpService.municipalityList().find(m => m.id === municipalityId);
    if (municipality) {
      this.municipalityHttpService.delete(municipality);
    }
  }
}
