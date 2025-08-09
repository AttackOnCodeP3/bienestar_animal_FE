import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTableModule } from '@angular/material/table';
import { GlbViewerComponent } from '@components/model3D';
import { GoogleMapsComponent } from '@components/googleMaps';
import { IViewAnimalRecord } from '@common/interfaces/view-animal-record.interface';

@Component({
  selector: 'view-animal-record',
  templateUrl: './view-animal-record.component.html',
  styleUrls: ['./view-animal-record.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatExpansionModule,
    MatTableModule,
    GlbViewerComponent,
    GoogleMapsComponent
  ]
})
export class AnimalRecordDetailsComponent {
  @Input() animal!: IViewAnimalRecord;
  @Input() formatAge!: (age: { years?: number; months?: number; days?: number } | undefined) => string;

}