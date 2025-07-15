import {inject} from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthHttpService } from '@services/http';
import {PagesUrlsEnum} from '@common/enums';


export const forgotPasswordGuard: CanActivateFn = () => {

    const router = inject(Router);
    const authHttpService = inject(AuthHttpService);
    const user = authHttpService.currentUser();

    const passwordResetRequired = user?.requiresPasswordChange === true;
      const isLoggedIn = authHttpService.isAuthenticated();

    return passwordResetRequired && isLoggedIn
        ? router.createUrlTree([PagesUrlsEnum.CHANGE_PASSWORD])
        : true;



}


