import { inject } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { AuthHttpService } from '@services/http';
import {RoutesUrlsEnum} from '@common/enums';

/**
 * Route guard that allows access only to unauthenticated (guest) users.
 *
 * If the user is already authenticated, it redirects to the dashboard page.
 *
 * @param route - The activated route snapshot.
 * @param state - The current router state snapshot.
 * @returns `true` if the user is not authenticated, otherwise a `UrlTree` redirecting to the dashboard.
 * @author dgutierrez
 */
export const guestGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree => {
  const router = inject(Router);
  const authService = inject(AuthHttpService);

  const isGuest = !authService.isAuthenticated();
  return isGuest ? true : router.createUrlTree([RoutesUrlsEnum.DASHBOARD]);
};
