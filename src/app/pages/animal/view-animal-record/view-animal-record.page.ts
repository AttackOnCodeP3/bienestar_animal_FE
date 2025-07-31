import { Component, OnInit, inject } from '@angular/core';
import {
  AnimalRecordHttpService
} from '@services/http';
import {MatFormField, MatLabel, MatOption, MatSelect} from '@angular/material/select';
import {GeneralContainerComponent} from '@components/layout';
import {MatCard, MatCardContent, MatCardTitle} from '@angular/material/card';
import {MatExpansionPanel, MatExpansionPanelHeader, MatExpansionPanelTitle} from '@angular/material/expansion';
import {MatTable, MatTableModule, MatHeaderRowDef, MatRowDef, MatHeaderCellDef, MatCellDef } from '@angular/material/table';
import {NgFor} from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-view-animal-record-page',
  templateUrl: './view-animal-record.page.html',
  imports: [
    MatSelect,
    GeneralContainerComponent,
    MatFormField,
    MatLabel,
    MatOption,
    MatCard,
    MatCardContent,
    MatCardTitle,
    MatExpansionPanel,
    MatExpansionPanelHeader,
    MatExpansionPanelTitle,
    MatTable,
    FormsModule,
    MatTableModule,
    MatHeaderRowDef,
    MatRowDef,
    MatHeaderCellDef,
    MatCellDef,
    NgFor,
  ],
  styleUrls: ['./view-animal-record.page.scss']
})
export class ViewAnimalRecordPage implements OnInit {
  animalList: any[] = [];
  selectedAnimalId: string | number | null = null;
  selectedAnimal: any = null;

  readonly animalService = inject(AnimalRecordHttpService);

  ngOnInit(): void {
    this.fetchAnimals();
  }

  fetchAnimals(): void {
    this.animalService.getAnimals().subscribe((response: any) => {
      this.animalList = Array.isArray(response.data) ? response.data : [];
    });
  }

  onAnimalSelect(animalId: string): void {
    this.selectedAnimalId = animalId;
    this.selectedAnimal = this.animalList.find(a => a.id === animalId) || null;
  }
    formatAge(age: any): string {
    if (!age) return '';
    let parts = [];
    if (age.years) parts.push(`${age.years} año${age.years > 1 ? 's' : ''}`);
    if (age.months) parts.push(`${age.months} mes${age.months > 1 ? 'es' : ''}`);
    if (age.days) parts.push(`${age.days} día${age.days > 1 ? 's' : ''}`);
    return parts.join(', ');
  }
}
