import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {AuthHttpService} from '@services/http';
import {PagesUrlsEnum} from '@common/enums';

/**
 * Ensures the authenticated user has completed their profile.
 * @author dgutierrez
 */
export const profileCompletedGuard: CanActivateFn = () => {
  const router = inject(Router);
  const authHttpService = inject(AuthHttpService);
  const user = authHttpService.currentUser();
  const hasCompletedProfile = user?.socialLoginCompleted ?? true;

  return hasCompletedProfile
    ? true
    : router.createUrlTree([PagesUrlsEnum.COMPLETE_PROFILE]);
};
