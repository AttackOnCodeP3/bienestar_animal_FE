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
import { HttpClient } from '@angular/common/http';
import { TranslatePipe } from '@ngx-translate/core';
import { MatIcon } from '@angular/material/icon';
import { AlertTypeEnum } from '@common/enums';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ChangeDetectorRef } from '@angular/core';
import { MaterialFileInputModule } from 'ngx-custom-material-file-input';

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
  diagnoses: any[] = [];

  private readonly fb = inject(FormBuilder);
  private readonly animalService = inject(CommunityAnimalHttpService);
  private readonly alertService = inject(AlertService);
  private readonly http = inject(HttpClient);
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
    this.loading = true;
    const formData = new FormData();
    formData.append('animalId', this.form.value.animalId);
    formData.append('imagen', this.selectedImage);
    formData.append('description', this.form.value.description);

    this.http.post('http://localhost:8080/diagnostico', formData).subscribe({
      next: () => {
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
      error: () => {
        this.alertService.displayAlert({
          type: AlertTypeEnum.ERROR,
          messageKey: 'Error al crear diagnóstico',
        });
        this.isSubmitting = false;
        this.loading = false;
      },
    });
  }
}
