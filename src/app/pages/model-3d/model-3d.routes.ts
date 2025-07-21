import { Routes } from '@angular/router';
import { RoutesUrlsEnum } from '@common/enums';

export const MODEL_3D_ROUTES: Routes = [
  {
    path: '',
    redirectTo: RoutesUrlsEnum.MODEL_3D_LIST,
    pathMatch: 'full',
  },
  {
    path: RoutesUrlsEnum.MODEL_3D_LIST,
    loadComponent: () =>
      import('@pages/model-3d/model-3d-list/model-3d-list.page').then(
        (m) => m.Model3DListPage
      ),
  },
  {
    path: RoutesUrlsEnum.MODEL_3D_CREATE,
    loadComponent: () =>
      import('@pages/model-3d/model-3d-create/model-3d-create.page').then(
        (m) => m.Model3DCreatePage
      ),
  },
];
