import { Injectable, signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AlertService } from '@services/general';
import { AlertTypeEnum } from '@common/enums';


@Injectable({ providedIn: 'root' })
export class Model3DCreateHttpService {
  private readonly baseUrl = 'http://localhost:8080';
  private readonly http = inject(HttpClient);
  private readonly alertService = inject(AlertService);

  readonly animals = signal<{ id: number, name: string }[]>([]);
  readonly loadingAnimals = signal(false);
  readonly createSuccess = signal(false);
  readonly createError = signal<string | null>(null);

  loadMyAnimals() {
    this.loadingAnimals.set(true);
    this.http.get<{ data: { id: number, name: string }[] }>(`${this.baseUrl}/community-animals/mine`)
      .subscribe({
        next: res => {
          this.animals.set(res.data);
          this.loadingAnimals.set(false);
        },
        error: (err: any) => { 
  this.alertService.displayAlert({ type: AlertTypeEnum.ERROR, messageKey: 'Error cargando animales' });
          this.animals.set([]);
          this.loadingAnimals.set(false);
        }
      });
  }

  createModel3D(formData: FormData) {
    this.createSuccess.set(false);
    this.createError.set(null);
    this.http.post(`${this.baseUrl}/model3d-animal/createTaskV25`, formData)
      .subscribe({
        next: () => {
          this.createSuccess.set(true);
this.alertService.displayAlert({ type: AlertTypeEnum.SUCCESS, messageKey: 'Modelo 3D enviado correctamente.' });        },
        error: (err: any) => { 
          this.createError.set('Error creando modelo 3D');
this.alertService.displayAlert({ type: AlertTypeEnum.ERROR, messageKey: 'Error creando modelo 3D' });        }
      });
  }

createModel3DTaskV25(animalId: number, imageUrl: string) {
  const params = new URLSearchParams();
  params.set('animal_id', animalId.toString());
  params.set('image_url', imageUrl);

  this.createSuccess.set(false);
  this.createError.set(null);
  this.http.post(
    `${this.baseUrl}/model3d-animal/createTaskV25?${params.toString()}`,
    null // No body, params go in URL
  ).subscribe({
    next: () => {
      this.createSuccess.set(true);
      this.alertService.displayAlert({ type: AlertTypeEnum.SUCCESS, messageKey: 'Modelo 3D enviado correctamente.' });
    },
    error: (err: any) => {
      this.createError.set('Error creando modelo 3D');
      this.alertService.displayAlert({ type: AlertTypeEnum.ERROR, messageKey: 'Error creando modelo 3D' });
    }
  });
}


}