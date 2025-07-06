import {Component, inject, OnInit} from '@angular/core';
import {Constants} from '@common/constants/constants';
import {ILoginResponse} from '@common/interfaces/http';
import {AuthHttpService} from '@services/http';
import {Router} from '@angular/router';
import {AlertTypeEnum, PagesUrlsEnum} from '@common/enums';
import {AlertService, I18nService} from '@services/general';

@Component({
  selector: 'app-social-callback',
  imports: [],
  templateUrl: './social-callback.page.html',
  styleUrl: './social-callback.page.scss',
  changeDetection: Constants.changeDetectionStrategy
})
export class SocialCallbackPage implements OnInit {
  private readonly alertService = inject(AlertService);
  private readonly authHttpService = inject(AuthHttpService);
  private readonly i18nService = inject(I18nService);
  private readonly router = inject(Router);

  ngOnInit() {
    this.authHttpService.getTokenFromSocialLogin().subscribe({
      next: (res: ILoginResponse) => {
        this.authHttpService.saveLoginResponseToSignalsAndStorage(res);
        const user = res.authUser;
        if (!user.socialLoginCompleted) {
          this.router.navigate([PagesUrlsEnum.COMPLETE_PROFILE]);
          this.alertService.displayAlert({
            type: AlertTypeEnum.INFO,
            messageKey: this.i18nService.i18nMessagesEnum.MAT_SNACK_AUTH_COMPLETE_PROFILE_TO_CONTINUE
          })
        } else {
          this.router.navigate([PagesUrlsEnum.DASHBOARD]);
        }
      },
      error: () => {
        this.router.navigate([PagesUrlsEnum.LOGIN]);
      }
    });
  }
}
