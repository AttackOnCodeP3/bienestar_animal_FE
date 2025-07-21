import { Component, OnInit, inject, effect } from '@angular/core';
import { GeneralContainerComponent } from '@components/layout';
import { CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { Router } from '@angular/router'; 
import {
  FormControl,
  ReactiveFormsModule,
  Validators,
  FormBuilder,
  FormGroup,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { AlertService, FormsService, I18nService } from '@services/general';
import { PagesUrlsEnum } from '@common/enums';
import { AlertTypeEnum } from '@common/enums';
import {ImageUploadHttpService, Model3DCreateHttpService} from '@services/http';


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
    GeneralContainerComponent,
    MatIcon 
  ],
})
export class Model3DCreatePage implements OnInit {
  form: FormGroup;
  animals: { id: number; name: string }[] = [];
  selectedImage: File | null = null;
  imageError: string | null = null;
  isSubmitting = false;

  private readonly fb = inject(FormBuilder);
  private readonly model3dService = inject(Model3DCreateHttpService);
  private readonly imageUploadService = inject(ImageUploadHttpService);
  private readonly alertService = inject(AlertService);
  readonly formsService = inject(FormsService);
  private readonly router = inject(Router);


  private readonly animalsEffect = effect(() => {
    this.animals = this.model3dService.animals();
  });

  constructor() {
    this.form = this.fb.group({
      animalId: [null, Validators.required],
      image: [null, Validators.required],
    });
  }

  ngOnInit() {
    this.model3dService.loadMyAnimals();
  }

  onImageChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      if (!file.type.startsWith('image/')) {
        this.imageError = 'Solo se permiten archivos de imagen.';
        this.selectedImage = null;
        return;
      }
      this.selectedImage = file;
      this.imageError = null;
      this.form.get('image')?.setValue(file);
    } else {
      this.selectedImage = null;
      this.imageError = 'Debe seleccionar una imagen.';
      this.form.get('image')?.setValue(null);
    }
  }

  submit(): void {
    if (this.form.invalid || !this.selectedImage) {
      this.alertService.displayAlert({
        type: AlertTypeEnum.ERROR,
        messageKey: 'Por favor complete todos los campos.',
      });
      return;
    }
    this.isSubmitting = true;
    this.imageUploadService.uploadImage(
      this.selectedImage,
      (url: string) => {
        this.model3dService.createModel3DTaskV25(this.form.value.animalId, url);
        this.isSubmitting = false;
      },
      () => {
        this.alertService.displayAlert({
          type: AlertTypeEnum.ERROR,
          messageKey: 'Error subiendo la imagen.',
        });
        this.isSubmitting = false;
      }
    );
  }
  navigateToListModel3D() {
    this.router.navigate([PagesUrlsEnum.MODEL_3D_LIST]);
  }
}
