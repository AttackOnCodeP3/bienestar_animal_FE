import { Component, OnInit } from '@angular/core';
import {
  AnimalRecordHttpService
} from '@services/http';
import {MatFormField, MatLabel, MatOption, MatSelect} from '@angular/material/select';
import {GeneralContainerComponent} from '@components/layout';
import {MatCard, MatCardContent, MatCardTitle} from '@angular/material/card';
import {MatExpansionPanel, MatExpansionPanelHeader, MatExpansionPanelTitle} from '@angular/material/expansion';
import {MatTable} from '@angular/material/table';
import {DatePipe} from '@angular/common';

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
    DatePipe
  ],
  styleUrls: ['./view-animal-record.page.scss']
})
export class ViewAnimalRecordPage implements OnInit {
  animalList: any[] = [];
  selectedAnimalId: string | null = null;
  selectedAnimal: any = null;

  constructor(

    private animalService: AnimalRecordHttpService
  ) {}

  ngOnInit(): void {
    this.fetchAnimals();
  }

  fetchAnimals(): void {
    this.animalService.getAnimals().subscribe((animals: any[]) => {
      this.animalList = animals;
    });
  }

  onAnimalSelect(animalId: string): void {
    this.selectedAnimalId = animalId;
    this.selectedAnimal = this.animalList.find(a => a.id === animalId) || null;
  }
}
