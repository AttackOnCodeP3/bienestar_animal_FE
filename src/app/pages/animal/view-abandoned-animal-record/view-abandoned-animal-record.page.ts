import { Component, OnInit, inject } from '@angular/core';
import {
  AnimalRecordHttpService
} from '@services/http';
import {MatFormField, MatLabel, MatOption, MatSelect} from '@angular/material/select';
import {GeneralContainerComponent} from '@components/layout';

import {MatTableModule } from '@angular/material/table';
import { FormsModule } from '@angular/forms';

import { Constants } from '@common/constants/constants';
import { AnimalRecordDetailsComponent } from '@components/animal-record';
import{IViewAnimalRecord} from '@common/interfaces/view-animal-record.interface';


@Component({
  selector: 'app-view-animal-record-page',
  templateUrl: './view-abandoned-animal-record.page.html',
  imports: [
    MatSelect,
    GeneralContainerComponent,
    MatFormField,
    MatLabel,
    MatOption,
    FormsModule,
    MatTableModule,
AnimalRecordDetailsComponent
  ],
  styleUrls: ['./view-abandoned-animal-record.page.scss']
})
export class ViewAbandonedAnimalRecordPage implements OnInit {
  animalList: IViewAnimalRecord[] = [];
  selectedAbandonedAnimalId: string | number | null = null;
  selectedAbandonedAnimal: IViewAnimalRecord | null = null;

  readonly animalService = inject(AnimalRecordHttpService);
  

  ngOnInit(): void {
    this.fetchAnimals();
  }

  fetchAnimals(): void {
    const userStr = localStorage.getItem(Constants.LS_APP_AUTH_USER);
    const user = userStr ? JSON.parse(userStr) : null;
    const ownerId = user?.id;

    if (!ownerId) {
      this.animalList = [];
      return;
    }
    this.animalService.getAbandonedAnimalsByOwnerId(ownerId).subscribe((response: any) => {
      this.animalList = response || [];
    });
  }

  onAnimalSelect(animalId: string): void {
    this.selectedAbandonedAnimalId = animalId;
    this.selectedAbandonedAnimal = this.animalList.find(a => a.id === animalId) || null;
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
