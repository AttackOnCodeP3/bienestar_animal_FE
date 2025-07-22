import { Injectable, signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AlertService } from '@services/general';
import { AlertTypeEnum } from '@common/enums';
import { Constants } from '@common/constants/constants'; 
import { IAnimalBasic } from '@common/interfaces/animal-basic';


@Injectable({ providedIn: 'root' })
export class Model3DCreateHttpService {
  private readonly baseUrl = Constants.appHost;
  private readonly http = inject(HttpClient);
  private readonly alertService = inject(AlertService);
  private readonly createTaskV25Endpoint = Constants.createTaskV25;
  private readonly communityAnimalsMine = Constants.communityAnimalsMine;

  readonly animals = signal<IAnimalBasic[]>([]);
  readonly loadingAnimals = signal(false);
  readonly createSuccess = signal(false);
  readonly createError = signal<string | null>(null);

  loadMyAnimals() {
    this.loadingAnimals.set(true);
    this.http.get<{ data: { id: number, name: string }[] }>(`${this.baseUrl}${this.communityAnimalsMine}`)
      .subscribe({
        next: res => {
          this.animals.set(res.data);
          this.loadingAnimals.set(false);
        },
        error: (err: any) => {
        this.alertService.displayAlert({ type: AlertTypeEnum.ERROR, messageKey: 'error.loadingAnimals' });
          this.animals.set([]);
          this.loadingAnimals.set(false);
        }
      });
  }

  createModel3D(formData: FormData) {
    this.createSuccess.set(false);
    this.createError.set(null);
    this.http.post(`${this.baseUrl}${this.createTaskV25Endpoint}`, formData)
      .subscribe({
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

createModel3DTaskV25(animalId: number, imageUrl: string) {
  const params = new URLSearchParams();
  params.set('animal_id', animalId.toString());
  params.set('image_url', imageUrl);

  this.createSuccess.set(false);
  this.createError.set(null);
  this.http.post(
    `${this.baseUrl}/model3d-animal/createTaskV25?${params.toString()}`,
    null 
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