import { signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ReportType, ReportDto } from '../../shared/models/report.models';

const API_BASE = 'http://localhost:8080/reports';

export class ReportsService {
  private http = inject(HttpClient);
  selectedType = signal<ReportType>(ReportType.MASCOTAS_POR_MUNICIPALIDAD);
  loading = signal<boolean>(false);
  error = signal<string | null>(null);
  data = signal<ReportDto | null>(null);

  async fetchSummary(type: ReportType) {
    this.loading.set(true);
    this.error.set(null);
    try {
      const res = await this.http.get(`${API_BASE}/summary?type=${type}`).toPromise();
      if (res && typeof res === 'object' && 'data' in res && 'message' in res) {
        (res as any)._hasNoDataMessage = (res as any).message === 'No hay datos';
      }
      this.data.set(res as ReportDto);
    } catch (e: any) {
      this.error.set('Ocurrió un error al cargar el reporte. Intente nuevamente.');
      this.data.set(null);
    } finally {
      this.loading.set(false);
    }
  }

  async download(type: ReportType, format: 'csv' | 'pdf') {
    const endpoint = `${API_BASE}/download/${format}?type=${type}`;
    try {
      const res = await this.http.get(endpoint, { responseType: 'blob', observe: 'response' }).toPromise();
      if (!res || !res.body) throw new Error('No se recibió archivo del backend.');
      const disposition = res.headers.get('Content-Disposition');
      let filename = disposition?.match(/filename="([^"]+)"/)?.[1] ?? `reporte-${type}.${format}`;
      const url = window.URL.createObjectURL(res.body);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (e: any) {
      this.error.set('Ocurrió un error al descargar el archivo.');
    }
  }
}
