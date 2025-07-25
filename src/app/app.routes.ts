import {  Routes  } from '@angular/router';
import {  RolesEnum, RoutesUrlsEnum  } from '@common/enums';
import {  authGuard, profileCompletedGuard, roleGuard, forgotPasswordGuard   } from '@core/guards';
import { DashboardLayoutComponent } from '@components/layout';

export const routes: Routes = [
  {
    path: '',
    redirectTo: RoutesUrlsEnum.AUTH,
    pathMatch: 'full',
  },
  {
    path: RoutesUrlsEnum.AUTH,
    loadChildren: () =>
      import('@pages/auth/auth.routes').then((m) => m.AUTH_ROUTES),
  },
  {
    path: RoutesUrlsEnum.DASHBOARD,
    component: DashboardLayoutComponent,
    canActivate: [authGuard, profileCompletedGuard, forgotPasswordGuard],
    children: [
      {
        path: '',
        redirectTo: RoutesUrlsEnum.HOME,
        pathMatch: 'full',
      },
      {
        path: RoutesUrlsEnum.HOME,
        canActivate: [
          roleGuard([
            RolesEnum.SUPER_ADMIN,
            RolesEnum.MUNICIPAL_ADMIN,
            RolesEnum.VOLUNTEER_USER,
            RolesEnum.COMMUNITY_USER,
          RolesEnum.CENSISTA_USER,
          ]),
        ],
        loadComponent: () =>
          import('@pages/home/home.page').then((m) => m.HomePage),
      },
      {
        path: RoutesUrlsEnum.GAMIFICATION,
        canActivate: [
          roleGuard([RolesEnum.SUPER_ADMIN, RolesEnum.VOLUNTEER_USER]),
        ],
        loadChildren: () =>
          import('@pages/gamification/gamification.routes').then(
            (m) => m.GAMIFICATION_ROUTES
          ),
      },
      {
        path: RoutesUrlsEnum.REPORTS,
        canActivate: [
          roleGuard([RolesEnum.SUPER_ADMIN, RolesEnum.MUNICIPAL_ADMIN]),
        ],
        loadChildren: () =>
          import('@pages/reports/reports.routes').then((m) => m.REPORTS_ROUTES),
      },
      {
        path: RoutesUrlsEnum.SECURITY,
        canActivate: [roleGuard([RolesEnum.SUPER_ADMIN])],
        loadChildren: () =>
          import('@pages/security/security.routes').then(
            (m) => m.SECURITY_ROUTES
          ),
      },
      {
        path: RoutesUrlsEnum.MUNICIPALITIES,
        canActivate: [roleGuard([RolesEnum.SUPER_ADMIN])],
        loadChildren: () =>
          import('@pages/municipalities/municipality.routes').then(
            (m) => m.MUNICIPALITY_ROUTES
          ),
      },
      {
        path: RoutesUrlsEnum.ANIMAL,
        canActivate: [roleGuard([RolesEnum.COMMUNITY_USER])],
        loadChildren: () => import('@pages/animal/animal.routes').then(m => m.ANIMAL_ROUTES),
      },

      {
        path: RoutesUrlsEnum.ABANDONED_ANIMAL,
        canActivate: [roleGuard([RolesEnum.CENSISTA_USER])],
        loadChildren: () => import('@pages/abandoned-animal/abandoned-animal.routes').then(m => m.ABANDONED_ANIMAL_ROUTES),
      },
   {
      path: RoutesUrlsEnum.MODEL_3D,
      canActivate: [roleGuard([RolesEnum.SUPER_ADMIN, RolesEnum.COMMUNITY_USER])],
      loadChildren: () =>
        import('@pages/model-3d/model-3d.routes').then((m) => m.MODEL_3D_ROUTES),
    },

    ]
  }
];
