import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface AbandonadosRow {
  canton: string;
  total: number;
}

@Injectable({ providedIn: 'root' })
export class ReportesService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = '/api/reportes';

  readonly abandonadosRows = signal<AbandonadosRow[]>([]);
  readonly csvBlob = signal<Blob | null>(null);
  readonly loading = signal(false);
  readonly error = signal<string | null>(null);

  fetchAbandonados(params: {
    from: number;
    to: number;
    cantonId?: number;
    municipalityId?: number;
    speciesId?: string;
    district?: string;
  }) {
    this.loading.set(true);
    this.error.set(null);
const sanitizedParams: { [key: string]: string | number } = {};
(Object.keys(params) as Array<keyof typeof params>).forEach(key => {
  if (params[key] !== undefined && params[key] !== null) {
    sanitizedParams[key] = params[key] as string | number;
  }
});
    this.http.get<AbandonadosRow[]>(`${this.baseUrl}/abandonados`, { params: sanitizedParams }).subscribe({
      next: (rows) => {
        this.abandonadosRows.set(rows);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set('Error al cargar el reporte');
        this.loading.set(false);
      }
    });
  }

  fetchCsv(params: {
    from: number;
    to: number;
    cantonId?: number;
    municipalityId?: number;
    speciesId?: string;
    district?: string;
  }) {
    this.loading.set(true);
    this.error.set(null);
    this.http.get(`${this.baseUrl}/abandonados.csv`, {
      params,
      responseType: 'blob'
    }).subscribe({
      next: (blob) => {
        this.csvBlob.set(blob);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set('Error al descargar el CSV');
        this.loading.set(false);
      }
    });
  }
}