import {Routes} from '@angular/router';
import {RoutesUrlsEnum} from '@common/enums';

/**
 * Defines the routes for the animal module.
 * @author dgutierrez
 */
export const ANIMAL_ROUTES: Routes = [
  {
    path: '',
    redirectTo: RoutesUrlsEnum.CREATE_ANIMAL_PROFILE,
    pathMatch: 'full'
  },
  {
    path: RoutesUrlsEnum.CREATE_ANIMAL_PROFILE,
    loadComponent: () => import('@pages/animal/create-animal-profile/create-animal-profile.page').then(m => m.CreateAnimalProfilePage)
  }
]
