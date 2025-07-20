import { Component, OnInit, inject, effect } from '@angular/core';
import { Model3DCreateHttpService } from '@services/http/model-3d-animal-http-service/model-3d-create-http.service';
import {GeneralContainerComponent} from '@components/layout';
import {CommonModule} from '@angular/common';
import {MatIcon} from '@angular/material/icon';
import {Router} from '@angular/router';
import {FormControl, ReactiveFormsModule, Validators, FormBuilder, FormGroup,} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import {TranslatePipe} from '@ngx-translate/core';
import {AlertService, FormsService, I18nService} from '@services/general';
import {PagesUrlsEnum} from '@common/enums';
import { AlertTypeEnum } from '@common/enums';



@Component({
  selector: 'app-model-3d-create',
  templateUrl: './model-3d-create.page.html',
  styleUrls: ['./model-3d-create.page.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    TranslatePipe,
    GeneralContainerComponent,
    MatIcon
  ]
})
export class Model3DCreatePage implements OnInit {
  form: FormGroup;
  animals: { id: number, name: string }[] = [];
  selectedImage: File | null = null;
  isSubmitting = false;

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
      image: [null, Validators.required]
    });
  }

  ngOnInit() {
    this.model3dService.loadMyAnimals();
  }

  onImageChange(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0] || null;
    this.selectedImage = file;
    this.form.patchValue({ image: file });
    this.form.get('image')?.updateValueAndValidity();
  }
submit() {
  if (this.form.invalid || !this.selectedImage) {
    this.alertService.displayAlert({ type: AlertTypeEnum.ERROR, messageKey: 'Por favor complete todos los campos.' });
    return;
  }
  this.isSubmitting = true;
  const formData = new FormData();
  formData.append('animalId', this.form.value.animalId);
  // Only append if not null
  if (this.selectedImage) {
    formData.append('image', this.selectedImage);
  }
  this.model3dService.createModel3D(formData);
  this.isSubmitting = false;
}
}