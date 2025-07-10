import {Routes} from '@angular/router';
import {RoutesUrlsEnum} from '@common/enums';

export const MUNICIPALITY_ROUTES: Routes = [
  {
    path: '',
    redirectTo: RoutesUrlsEnum.MUNICIPALITY_LIST,
    pathMatch: 'full'
  },
  {
    path: RoutesUrlsEnum.MUNICIPALITY_LIST,
    loadComponent: () => import('./list/municipality-list.page').then(m => m.MunicipalityListPage)
  },
  {
    path: RoutesUrlsEnum.MUNICIPALITY_CREATE,
    loadComponent: () => import('./create/municipality-create.page').then(m => m.MunicipalityCreatePage)
  },
  {
    path: `${RoutesUrlsEnum.MUNICIPALITY_EDIT}/:id`,
    loadComponent: () => import('./edit/municipality-edit.page').then(m => m.MunicipalityEditPage)
  }
];
