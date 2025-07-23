import {Routes} from '@angular/router';
import {RouteParamPathsEnum, RoutesUrlsEnum} from '@common/enums';

export const MUNICIPALITY_ROUTES: Routes = [
  {
    path: '',
    redirectTo: RoutesUrlsEnum.MUNICIPALITY_LIST,
    pathMatch: 'full'
  },
  {
    path: RoutesUrlsEnum.MUNICIPALITY_LIST,
    loadComponent: () => import('@pages/municipalities/municipality-list/municipality-list.page').then(m => m.MunicipalityListPage)
  },
  {
    path: RoutesUrlsEnum.MUNICIPALITY_CREATE,
    loadComponent: () => import('@pages/municipalities/municipality-create/municipality-create.page').then(m => m.MunicipalityCreatePage)
  },
  {
    path: RoutesUrlsEnum.MUNICIPALITY_EDIT + RouteParamPathsEnum.MUNICIPALITY_ID,
    loadComponent: () => import('@pages/municipalities/municipality-edit/municipality-edit.page').then(m => m.MunicipalityEditPage)
  }
];
