import { Routes } from '@angular/router';
import { RoutesUrlsEnum } from '@common/enums';

export const ANIMAL_DIAGNOSIS_ROUTES: Routes = [
  {
    path: '',
    redirectTo: RoutesUrlsEnum.ANIMAL_DIAGNOSIS_LIST,
    pathMatch: 'full',
  },
  {
    path: RoutesUrlsEnum.ANIMAL_DIAGNOSIS_LIST,
    loadComponent: () =>
      import('./animal-diagnosis-list/animal-diagnosis-list.page').then(
        (m) => m.AnimalDiagnosisListPage
      ),
  },
  {
    path: RoutesUrlsEnum.ANIMAL_DIAGNOSIS_CREATE,
    loadComponent: () =>
      import('./animal-diagnosis-create/animal-diagnosis-create.page').then(
        (m) => m.AnimalDiagnosisCreatePage
      ),
  },
];
