import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import {AuthHttpService} from '@services/http';
import {PagesUrlsEnum} from '@common/enums';

export const AuthGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthHttpService);

  if (authService.isAuthenticated()) return true;

  router.navigate([PagesUrlsEnum.AUTH]);
  return false;
};
