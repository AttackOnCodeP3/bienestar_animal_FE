import { inject } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {AuthHttpService} from '@services/http';
import {PagesUrlsEnum} from '@common/enums';

/**
 * Route guard that allows access only to authenticated users.
 *
 * If the user is not authenticated, it redirects to the authentication page.
 *
 * @param route - The activated route snapshot.
 * @param state - The current router state snapshot.
 * @returns `true` if the user is authenticated, otherwise a `UrlTree` redirecting to the login page.
 * @author dgutierrez
 */
export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree => {
  const router = inject(Router);
  const authHttpService = inject(AuthHttpService);

  const isLoggedIn = authHttpService.isAuthenticated();
  return isLoggedIn ? true : router.createUrlTree([PagesUrlsEnum.AUTH]);
};
