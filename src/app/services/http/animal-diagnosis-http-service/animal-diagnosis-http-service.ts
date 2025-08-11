import { Injectable, signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AlertService } from '@services/general';
import { AlertTypeEnum } from '@common/enums';
import { Constants } from '@common/constants/constants';
import { UnmutableConstants } from '@common/constants/unmutable-constants';

export interface AnimalDiagnosis {
  id: number;
  imagenUrl: string;
  description: string;
  createdAt: string;
  observacion: string;
  advertencia: string;
}

@Injectable({ providedIn: 'root' })
export class AnimalDiagnosisHttpService {
  private readonly baseUrl = Constants.appHost;
  private readonly http = inject(HttpClient);
  private readonly alertService = inject(AlertService);

  readonly diagnoses = signal<AnimalDiagnosis[]>([]);
  readonly loadingDiagnoses = signal(false);
  readonly errorDiagnoses = signal<string | null>(null);
  readonly totalElements = signal(0);

loadDiagnoses(animalId: number, page: number, size: number) {
  this.loadingDiagnoses.set(true);
  this.errorDiagnoses.set(null);
  this.http.get<any>(
    `${this.baseUrl}${UnmutableConstants.DIAGNOSIS_URL}?animalId=${animalId}&page=${page}&size=${size}`
  ).subscribe({
    next: data => {
      // Usa data.items
      this.diagnoses.set(Array.isArray(data.items) ? data.items : []);
      this.totalElements.set(data.totalItems ?? data.items?.length ?? 0);
      this.loadingDiagnoses.set(false);
    },
    error: () => {
      this.errorDiagnoses.set('Error al cargar diagnósticos');
      this.loadingDiagnoses.set(false);
    }
  });
}
  createDiagnosis(formData: FormData, onSuccess?: () => void, onError?: () => void) {
    this.loadingDiagnoses.set(true);
    this.http.post(`${this.baseUrl}${UnmutableConstants.DIAGNOSIS_URL}`, formData).subscribe({
      next: () => {
        this.alertService.displayAlert({ type: AlertTypeEnum.SUCCESS, messageKey: 'Diagnóstico creado exitosamente' });
        this.loadingDiagnoses.set(false);
        if (onSuccess) onSuccess();
      },
      error: () => {
        this.alertService.displayAlert({ type: AlertTypeEnum.ERROR, messageKey: 'Error al crear diagnóstico' });
        this.loadingDiagnoses.set(false);
        if (onError) onError();
      }
    });
  }
}