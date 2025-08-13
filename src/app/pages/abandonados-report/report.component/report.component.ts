import { Component, effect, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ReportesService, AbandonadosRow } from '../../../services/reportes-service/reportes.service';
@Component({
  selector: 'app-abandonados-report',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class AbandonadosReportComponent implements OnInit {
  private readonly reportesService = inject(ReportesService);
  private readonly fb = inject(FormBuilder);

readonly form = this.fb.group({
  from: [Date.now() - 30 * 24 * 3600 * 1000 as number],
  to: [Date.now() as number],
  cantonId: [undefined as number | undefined],
  municipalityId: [undefined as number | undefined],
  speciesId: [undefined as string | undefined],
  district: [undefined as string | undefined]
});

  readonly rows = signal<AbandonadosRow[]>([]);
  readonly loading = signal(false);
  readonly error = signal<string | null>(null);

  ngOnInit() {
    this.fetchReport();
  }

fetchReport() {
  const value = this.form.value;
  const params = {
    from: typeof value.from === 'number' ? value.from : Date.now(),
    to: typeof value.to === 'number' ? value.to : Date.now(),
    cantonId: typeof value.cantonId === 'number' ? value.cantonId : undefined,
    municipalityId: typeof value.municipalityId === 'number' ? value.municipalityId : undefined,
    speciesId: typeof value.speciesId === 'string' ? value.speciesId : undefined,
    district: typeof value.district === 'string' ? value.district : undefined
  };
  this.reportesService.fetchAbandonados(params);
  // Use this.reportesService.abandonadosRows() to get the data
}

downloadCsv() {
  const value = this.form.value;
  const params = {
    from: typeof value.from === 'number' ? value.from : Date.now(),
    to: typeof value.to === 'number' ? value.to : Date.now(),
    cantonId: typeof value.cantonId === 'number' ? value.cantonId : undefined,
    municipalityId: typeof value.municipalityId === 'number' ? value.municipalityId : undefined,
    speciesId: typeof value.speciesId === 'string' ? value.speciesId : undefined,
    district: typeof value.district === 'string' ? value.district : undefined
  };
  this.reportesService.fetchCsv(params);

  effect(() => {
    const blob = this.reportesService.csvBlob();
    if (blob) {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'abandonados.csv';
      a.click();
      window.URL.revokeObjectURL(url);
      this.reportesService.csvBlob.set(null);
    }
  });
}
}