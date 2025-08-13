import { Component, signal, computed, effect, inject } from '@angular/core';
import { ApexAxisChartSeries, ApexChart, ApexXAxis, ApexTitleSubtitle, ApexDataLabels, ApexPlotOptions } from 'ng-apexcharts';
import { ReportsService } from '../../../core/services/reports.service';
import { ReportType, ReportDto, MascotasPorDistritoDto, AnimalesCallejerosDto, AnimalesConHogarDto, IndicadoresMaltratoDto } from '../../../shared/models/report.models';

@Component({
  selector: 'app-report-1',
  standalone: true,
  templateUrl: './report-1.component.html',
  styleUrls: ['./report-1.component.scss'],
  imports: [/* Add NgApexchartsModule here if not already imported */],
  providers: [ReportsService],
})
export class Report1Component {
  public Array = Array;
  private reports = inject(ReportsService);

  reportTypes = [
    { value: ReportType.MASCOTAS_POR_MUNICIPALIDAD, label: '1-Mascotas por Municipalidad' },
    { value: ReportType.ANIMALES_CALLEJEROS, label: '2-Control de Animales Callejeros o sin Dueño' },
    { value: ReportType.ESTERILIZACION_MUNICIPIO, label: '3-Esterilización por Municipalidad y Sexo' },
    { value: ReportType.INDICADORES_ABANDONO, label: '4-Indicadores de maltrato o abandono detectados' },
  ];

  selectedType = this.reports.selectedType;
  loading = this.reports.loading;
  error = this.reports.error;
  data = this.reports.data;

  chartOptions = computed(() => {
    const type = this.selectedType();
    const raw = this.data();
    const summary = raw && typeof raw === 'object' && 'summary' in raw ? (raw as any).summary : null;
    const data = raw && typeof raw === 'object' && 'data' in raw ? (raw as any).data : [];
    switch (type) {
      case ReportType.MASCOTAS_POR_MUNICIPALIDAD:
        const chartSource = Array.isArray(summary) && summary.length > 0 ? summary : data;
        return {
          series: [{
            name: 'Mascotas',
            data: (chartSource as any[]).map((d: any) => d.totalPets),
          }],
          chart: { type: 'bar', height: 350 },
          xaxis: { categories: (chartSource as any[]).map((d: any) => d.districtName || d.municipalityName) },
          title: { text: 'Mascotas por Municipalidad' },
        };
      case ReportType.ANIMALES_CALLEJEROS:
        return {
          series: [{
            name: 'Animales Callejeros',
            data: (data as AnimalesCallejerosDto[]).map(d => d.totalStreetAnimals),
          }],
          chart: { type: 'line', height: 350 },
          xaxis: { categories: (data as AnimalesCallejerosDto[]).map(d => `${d.month} - ${d.area}`) },
          title: { text: 'Animales Callejeros por Mes y Área' },
        };
      case ReportType.ANIMALES_CON_HOGAR:
        return {
          series: [
            {
              name: 'Con Hogar',
              data: (data as AnimalesConHogarDto[]).map(d => d.withHome),
            },
            {
              name: 'Atención Médica',
              data: (data as AnimalesConHogarDto[]).map(d => d.medicalAttention),
            },
            {
              name: 'Esterilizados',
              data: (data as AnimalesConHogarDto[]).map(d => d.sterilized),
            },
          ],
          chart: { type: 'bar', height: 350 },
          xaxis: { categories: (data as AnimalesConHogarDto[]).map(d => d.district) },
          title: { text: 'Animales con Hogar, Atención Médica y Esterilización' },
        };
      case ReportType.INDICADORES_ABANDONO:
        return {
          series: [{
            name: 'Indicadores',
            data: (data as IndicadoresMaltratoDto[]).map(d => d.count),
          }],
          chart: { type: 'bar', height: 350 },
          xaxis: { categories: (data as IndicadoresMaltratoDto[]).map(d => d.category + (d.district ? ` (${d.district})` : '')) },
          title: { text: 'Indicadores de Maltrato o Abandono' },
        };
      default:
        return {
          series: [],
          chart: { type: 'bar', height: 350 },
          xaxis: { categories: [] },
          title: { text: '' },
        };
    }
  });

  get showNoDataMessage(): boolean {
    const d = this.data();
    if (d && typeof d === 'object' && 'message' in d && (d as any).message === 'No hay datos') return true;
    if (Array.isArray(d) && d.length === 0) return true;
    return !d;
  }

  onTypeChange(type: string) {
    const selected = Object.values(ReportType).find(t => t === type) ?? ReportType.MASCOTAS_POR_MUNICIPALIDAD;
    this.selectedType.set(selected);
    this.reports.fetchSummary(selected);
  }

  download(format: 'csv' | 'pdf') {
    this.reports.download(this.selectedType(), format);
  }

  constructor() {
    effect(() => {
      this.reports.fetchSummary(this.selectedType());
    });
  }
}
