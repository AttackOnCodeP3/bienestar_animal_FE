import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-report-list',
  standalone: true,
  template: `
    <div class="report-list-container">
      <h2>Lista de Reportes</h2>
      <ul>
        <li>
          <button class="btn btn-link" (click)="goToReport('report-1')">
            Mascotas por Distrito / Dashboard 1
          </button>
        </li>
        <li>
          <button class="btn btn-link" (click)="goToReport('report-2')">
            Mascotas por Especie y Sexo / Dashboard 2
          </button>
        </li>
        <li>
          <button class="btn btn-link" (click)="goToReport('report-3')">
            Mascotas Esterilizadas por Municipio y Sexo / Dashboard 3
          </button>
        </li>
        <li>
          <button class="btn btn-link" (click)="goToReport('indicadores-maltrato')">
            Indicadores de Maltrato Animal
          </button>
        </li>
      </ul>
    </div>
  `,
  styles: [`
    .report-list-container { padding: 2rem; }
    ul { list-style: none; padding: 0; }
    li { margin-bottom: 1rem; }
    .btn-link { text-decoration: underline; color: #1976d2; background: none; border: none; cursor: pointer; font-size: 1.1rem; }
  `]
})
export class ReportListComponent {
  constructor(private router: Router) {}

  goToReport(report: string) {
    this.router.navigate([report]);
  }
}
