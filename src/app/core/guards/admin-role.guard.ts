import { Injectable, inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import {AuthHttpService} from '@services/http';
import {RolesEnum} from '@common/enums';

@Injectable({
  providedIn: 'root',
})
export class AdminRoleGuard implements CanActivate {
  private authHttpService = inject(AuthHttpService);
  private router = inject(Router);

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const hasRole = this.authHttpService.hasRole(RolesEnum.MUNICIPAL_ADMIN) || this.authHttpService.hasRole(RolesEnum.SUPER_ADMIN);

    if (!hasRole) {
      this.router.navigate(['access-denied']);
      return false;
    }
    return true;
  }
}
