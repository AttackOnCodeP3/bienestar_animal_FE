// src/app/pages/model-3d/model-3d-list/model-3d-list.page.ts
import { Component, OnInit, inject, ChangeDetectionStrategy, effect } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { TranslatePipe } from '@ngx-translate/core';

import { GeneralContainerComponent } from '@components/layout';
import { GlbViewerComponent } from '@components/model3D';
import { AlertTypeEnum } from '@common/enums';

import { AlertService, FormsService } from '@services/general';
import { Model3DCreateHttpService } from '@services/http/model-3d-animal-http-service/model-3d-create-http.service';

@Component({
  selector: 'app-model-3d-list',
  templateUrl: './model-3d-list.page.html',
  styleUrls: ['./model-3d-list.page.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    TranslatePipe,
    GeneralContainerComponent,
    MatIcon,
    GlbViewerComponent,
  ],
})
export class Model3DListPage implements OnInit {
  form: FormGroup;
  animals: { id: number; name: string }[] = [];
  selectedImage: File | null = null;

  private readonly fb = inject(FormBuilder);
  private readonly model3dService = inject(Model3DCreateHttpService);
  private readonly alertService = inject(AlertService);
  readonly formsService = inject(FormsService);
  private readonly animalsEffect = effect(() => {
    this.animals = this.model3dService.animals();
  });
  constructor() {
    this.form = this.fb.group({
      animalId: [null, Validators.required],
    });
  }

  ngOnInit(): void {
    this.model3dService.loadMyAnimals();


  }


  get selectedAnimalId(): number | null {
    return this.form.get('animalId')?.value ?? null;
  }

}
