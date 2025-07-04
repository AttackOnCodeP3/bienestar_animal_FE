import {inject} from '@angular/core';
import {CanActivateFn, Router, UrlTree} from '@angular/router';
import {PagesUrlsEnum, RolesEnum} from '@common/enums';
import {AuthHttpService} from '@services/http';

/**
 * Returns a route guard that grants access only to users with at least one of the specified roles.
 * If the user lacks the required roles, they will be redirected to the provided path.
 *
 * @param requiredRoles - An array of roles required to activate the route.
 * @param redirectTo - Optional path to redirect unauthorized users. Defaults to the access denied page.
 * @returns A `CanActivateFn` that validates the user's role and handles redirection.
 * @author dgutierrez
 */
export const roleGuard = (
  requiredRoles: RolesEnum[],
  redirectTo: string = PagesUrlsEnum.ACCESS_DENIED
): CanActivateFn => {
  return (): boolean | UrlTree => {
    const auth = inject(AuthHttpService);
    const router = inject(Router);

    const hasRequiredRole = requiredRoles.some(role => auth.hasRole(role));
    return hasRequiredRole ? true : router.createUrlTree([redirectTo]);
  };
};
