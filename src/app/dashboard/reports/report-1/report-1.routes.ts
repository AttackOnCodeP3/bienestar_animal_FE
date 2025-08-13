import { Route } from '@angular/router';
import { Report1Component } from './report-1.component';

export default [
  {
    path: '',
    loadComponent: () => import('./report-1.component').then(m => m.Report1Component),
  },
] as Route[];
