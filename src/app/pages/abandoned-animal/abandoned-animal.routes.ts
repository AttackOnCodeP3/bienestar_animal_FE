import {Routes} from '@angular/router';
import {RoutesUrlsEnum} from '@common/enums';

/**
 * Defines the routes for the abandoned animal module.
 * @author gjimenez
 */

export const ABANDONED_ANIMAL_ROUTES: Routes = [
  {
    path: '',
    redirectTo: RoutesUrlsEnum.CREATE_ABANDONED_ANIMAL,
    pathMatch: 'full'
  },
  {
    path: RoutesUrlsEnum.CREATE_ABANDONED_ANIMAL,
    loadComponent: () =>
      import('@pages/abandoned-animal/create-abandoned-animal/create-abandoned-animal.page')
        .then(m => m.CreateAbandonedAnimalPage)
  }
];
