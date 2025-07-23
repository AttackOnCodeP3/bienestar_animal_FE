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
  const authService = inject(AuthHttpService);
  const user = authService.currentUser();

  const isSocial = user?.usedSocialLogin === true;
  const isCompleted = user?.socialLoginCompleted === true;

  const mustCompleteProfile = isSocial && !isCompleted;

  return mustCompleteProfile
    ? router.createUrlTree([PagesUrlsEnum.COMPLETE_PROFILE])
    : true;
}
