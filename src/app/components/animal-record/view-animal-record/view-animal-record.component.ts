import { Component, Input } from '@angular/core';
import {MatFormField, MatLabel, MatOption, MatSelect} from '@angular/material/select';
import {MatCard, MatCardContent, MatCardTitle} from '@angular/material/card';
import {MatExpansionPanel, MatExpansionPanelHeader, MatExpansionPanelTitle} from '@angular/material/expansion';
import {MatTable, MatTableModule, MatHeaderRowDef, MatRowDef, MatHeaderCellDef, MatCellDef } from '@angular/material/table';
import { GlbViewerComponent } from '@components/model3D';
import { GoogleMapsComponent } from '@components/googleMaps';

@Component({
  selector: 'view-animal-record',
  templateUrl: './view-animal-record.component.html',
  styleUrls: ['./view-animal-record.component.scss'],
  imports: [
    MatCard,
    MatCardContent,
    MatCardTitle,
    MatExpansionPanel,
    MatExpansionPanelHeader,
    MatExpansionPanelTitle,
    MatTable,
    MatHeaderRowDef,
    MatRowDef,
    MatHeaderCellDef,
    MatCellDef,    
    GlbViewerComponent,
    GoogleMapsComponent
    ]
})
export class AnimalRecordDetailsComponent {
  @Input() animal: any;
  @Input() formatAge: (age: any) => string = (age) => age; // Puedes sobreescribir si lo necesitas
}