import {Component, inject, OnInit} from '@angular/core';
import {Constants} from '@common/constants/constants';
import {ILoginResponse} from '@common/interfaces/http';
import {AuthHttpService} from '@services/http';
import {Router} from '@angular/router';

@Component({
  selector: 'app-social-callback',
  imports: [],
  templateUrl: './social-callback.page.html',
  styleUrl: './social-callback.page.scss',
  changeDetection: Constants.changeDetectionStrategy
})
export class SocialCallbackPage implements OnInit {
  private readonly authHttpService = inject(AuthHttpService);
  private readonly router = inject(Router);

  ngOnInit() {
    this.authHttpService.getTokenFromSocialLogin().subscribe({
      next: (res: ILoginResponse) => {
        this.authHttpService.saveLoginResponseToSignalsAndStorage(res);
        const user = res.authUser;
        if (!user.socialLoginCompleted) {
          this.router.navigate(['/auth/complete-profile']);
        } else {
          this.router.navigate(['/dashboard']);
        }
      },
      error: () => {
        this.router.navigate(['/auth/login']);
      }
    });
  }
}
