import { Component, computed, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  MatCell, MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef,
  MatRow, MatRowDef,
  MatTable, MatTableDataSource
} from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import {MunicipalityHttpService} from '@services/http';
import {PagesUrlsEnum} from '@common/enums';
import { I18nFormsEnum } from '@common/enums/i18n/i18n-forms.enum';
import { I18nButtonsEnum } from '@common/enums/i18n/i18n-buttons.enum';



@Component({
  selector: 'app-municipality-list',
  standalone: true,
  templateUrl: './municipality-list.page.html',
  styleUrls: ['./municipality-list.page.scss'],
  imports: [
    MatTable,
    MatHeaderCell,
    MatCell,
    MatHeaderRow,
    MatRow,
    MatColumnDef,
    MatHeaderRowDef,
    MatRowDef,
    MatCellDef,
    MatHeaderCellDef,
    MatButtonModule
  ]
})
export class MunicipalityListPage implements OnInit {
  private readonly municipalityHttpService = inject(MunicipalityHttpService);
  private readonly router = inject(Router);
  readonly I18nFormsEnum = I18nFormsEnum;
  readonly I18nGeneralEnum = I18nButtonsEnum;

  dataSource = computed(() => {
    return new MatTableDataSource(this.municipalityHttpService.municipalityList());
  });

  displayedColumns = ['name', 'email', 'actions'];

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
