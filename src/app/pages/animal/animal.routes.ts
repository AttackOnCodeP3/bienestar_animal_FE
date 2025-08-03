import {Routes} from '@angular/router';
import {RoutesUrlsEnum} from '@common/enums';
import {roleGuard} from '@core/guards';
import {RolesEnum} from '@common/enums';

/**
 * Defines the routes for the animal module.
 * @author dgutierrez
 * @modifiedBy gjimenez
 */
export const ANIMAL_ROUTES: Routes = [
  {
    path: '',
    redirectTo: RoutesUrlsEnum.CREATE_ANIMAL_PROFILE,
    pathMatch: 'full'
  },
  {
    path: RoutesUrlsEnum.CREATE_ANIMAL_PROFILE,
    loadComponent: () =>
      import('@pages/animal/create-animal-profile/create-animal-profile.page')
        .then(m => m.CreateAnimalProfilePage),
    canActivate: [roleGuard([RolesEnum.COMMUNITY_USER])],
  },
  {
    path: RoutesUrlsEnum.REGISTER_COMMUNITY_ANIMAL_BY_CENSUS,
    loadComponent: () =>
      import('@pages/animal/register-community-animal-by-census/register-community-animal-by-census.page')
        .then(m => m.RegisterCommunityAnimalByCensusPage),
    canActivate: [roleGuard([RolesEnum.CENSISTA_USER])],
  }
];
