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
import { GlbViewerComponent } from '@components/model3D';
import { GoogleMapsComponent } from '@components/googleMaps';
import { Constants } from '@common/constants/constants';

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
    GlbViewerComponent,
    GoogleMapsComponent
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
    const userStr = localStorage.getItem(Constants.LS_APP_AUTH_USER);
    const user = userStr ? JSON.parse(userStr) : null;
    const ownerId = user?.id;
    console.log('Owner ID:', ownerId);
    if (!ownerId) {
      this.animalList = [];
      return;
    }
    this.animalService.getAnimalsByOwnerId(ownerId).subscribe((response: any) => {
      this.animalList = response || [];
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
