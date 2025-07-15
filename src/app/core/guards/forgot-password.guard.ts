import {inject} from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthHttpService } from '@services/http';
import {PagesUrlsEnum} from '@common/enums';

/* import {CanActivateFn, Router} from '@angular/router';

import {AuthHttpService} from '@services/http';


/**
 * Ensures the authenticated user has completed their profile.
 * @author dgutierrez
 */
/* export const profileCompletedGuard: CanActivateFn = () => {
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
  */

export const forgotPasswordGuard: CanActivateFn = () => {

    const router = inject(Router);
    const authHttpService = inject(AuthHttpService);
    const user = authHttpService.currentUser();

    const passwordResetRequired = user?.requiresPasswordChange === true;
    return passwordResetRequired
        ? router.createUrlTree([PagesUrlsEnum.CHANGE_PASSWORD])
        : true;



}


