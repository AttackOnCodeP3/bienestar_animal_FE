import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { GeneralContainerComponent } from '@components/layout';
import { AlertService, FormsService } from '@services/general';
import { CommunityAnimalHttpService } from '@services/http/community-animal-http-service/community-animal-http.service';
import { TranslatePipe } from '@ngx-translate/core';
import { MatIcon } from '@angular/material/icon';
import { AlertTypeEnum } from '@common/enums';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MaterialFileInputModule } from 'ngx-custom-material-file-input';
import { AnimalDiagnosisHttpService } from '@services/http/animal-diagnosis-http-service/animal-diagnosis-http-service';

@Component({
  selector: 'app-animal-diagnosis-create',
  standalone: true,
  templateUrl: './animal-diagnosis-create.page.html',
  styleUrls: ['./animal-diagnosis-create.page.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    GeneralContainerComponent,
    TranslatePipe,
    MatIcon,
    MatProgressSpinnerModule,
    MaterialFileInputModule,
  ],
})
export class AnimalDiagnosisCreatePage implements OnInit {
  form!: FormGroup;
  animals: { id: number; name: string }[] = [];
  selectedImage: File | null = null;
  imageError: string | null = null;
  isSubmitting = false;
  loading = false;
  error: string | null = null;

  private readonly fb = inject(FormBuilder);
  private readonly animalService = inject(CommunityAnimalHttpService);
  private readonly alertService = inject(AlertService);
  private readonly diagnosisHttp = inject(AnimalDiagnosisHttpService);
  readonly formsService = inject(FormsService);

  ngOnInit() {
    this.form = this.fb.group({
      animalId: [null, Validators.required],
      image: [null, Validators.required],
      description: ['', Validators.required],
    });
    this.animalService.getMine();
    this.animals = this.animalService
      .communityAnimalListMine()
      .filter((a) => a.id !== null) as { id: number; name: string }[];
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
    this.loading = true;
    const formData = new FormData();
    formData.append('animalId', this.form.value.animalId);
    formData.append('imagen', this.selectedImage);
    formData.append('description', this.form.value.description);

    this.diagnosisHttp.createDiagnosis(
      formData,
      () => {
        this.alertService.displayAlert({
          type: AlertTypeEnum.SUCCESS,
          messageKey: 'Diagnóstico creado exitosamente',
        });
        this.form.reset();
        Object.values(this.form.controls).forEach((control) => {
          control.markAsPristine();
          control.markAsUntouched();
          control.updateValueAndValidity();
        });
        this.imageError = null;
        this.selectedImage = null;
        this.isSubmitting = false;
        this.loading = false;
      },
      () => {
        this.alertService.displayAlert({
          type: AlertTypeEnum.ERROR,
          messageKey: 'Error al crear diagnóstico',
        });
        this.isSubmitting = false;
        this.loading = false;
      }
    );
  }

  showAnimalIdError(): boolean {
    const control = this.form.get('animalId');
    return this.formsService.isFieldInvalid(control);
  }

  getAnimalIdErrorMessage(): string {
    const control = this.form.get('animalId');
    return this.formsService.getErrorMessage(control);
  }

  showImageError(): boolean {
    const control = this.form.get('image');
    return this.formsService.isFieldInvalid(control);
  }

  getImageErrorMessage(): string {
    const control = this.form.get('image');
    return this.formsService.getErrorMessage(control);
  }

  showDescriptionError(): boolean {
    const control = this.form.get('description');
    return this.formsService.isFieldInvalid(control);
  }

  getDescriptionErrorMessage(): string {
    const control = this.form.get('description');
    return this.formsService.getErrorMessage(control);
  }
  
  onImageChange(event: Event): void {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files.length > 0) {
    const file = input.files[0];
    this.selectedImage = file;
    this.form.get('image')?.setValue(file);
    this.imageError = null;
  } else {
    this.selectedImage = null;
    this.form.get('image')?.setValue(null);
    this.imageError = 'Debe seleccionar una imagen.';
  }
}
}