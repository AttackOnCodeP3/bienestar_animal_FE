import { Injectable, Inject } from "@angular/core";
import { Constants } from "@common/constants/constants";
import { BaseHttpService } from "../base-http-service/base-http.service";
import { AlertTypeEnum, PagesUrlsEnum } from "@common/enums";
import { AuthHttpService } from "../auth-http-service/auth-http.service";

/**
 * Service for handling password change HTTP requests.
 * 
 * Extends the {@link BaseHttpService} to provide functionality for changing a user's password.
 * Utilizes the authentication service to log out the user after a successful password change.
 * 
 * @author @aBlancoC
 */
@Injectable({
    providedIn: 'root'
})


export class ChangePwHttpService extends BaseHttpService<String> {

    protected override source: string = Constants.CHANGE_PASSWORD_URL;
    readonly forwardUrl: string = PagesUrlsEnum.LOGIN;
        
constructor(
   private readonly authHttpService = inject(AuthHttpService);
) {
    super();
}
    changePassword(userId: number, oldPassword: string, newPassword: string, confirmPassword: string): void {
        
        const payload = {
            userId: userId,
            currentPassword: oldPassword,
            newPassword: newPassword,
            confirmPassword: confirmPassword
        };

        this.add(payload).subscribe({
            next: (response) => {
                this.alertService.displayAlert({
                    type: AlertTypeEnum.SUCCESS,
                    messageKey: response.message
                });
                setTimeout(() => {
                    this.authHttpService.logout();
                window.location.href = this.forwardUrl;
            }, 2000);
            return;
            },
            error: this.handleError({
                message: 'An error occurred while updating the password',
                context: `${this.constructor.name}#changePassword`
            })
        });
    }
}

