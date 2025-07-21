import { Injectable } from "@angular/core";
import { Constants } from "@common/constants/constants";
import { Router } from '@angular/router';
import { BaseHttpService } from "../base-http-service/base-http.service";
import { AlertTypeEnum } from "@common/enums/alert-type.enum";
import { PagesUrlsEnum } from "@common/enums";

/**
 * Service for handling forgot password HTTP requests.
 * Extends the BaseHttpService to provide functionality for sending password reset emails.
 *
 * @author @aBlancoC
 * @extends BaseHttpService<String>
 * @@Injectable
 */
@Injectable({
    providedIn: 'root'
})

export class ForgotPasswordHttpService extends BaseHttpService<String> {

    protected override source: string = Constants.FORGOT_PASSWORD_URL;
    readonly forwardUrl: string = PagesUrlsEnum.LOGIN;
 
   constructor(private router: Router) {
       super();
   }
    save(email: string): void {
        this.add({ email: email }).subscribe({
            next: (response) => {
                this.alertService.displayAlert({
                    type: AlertTypeEnum.SUCCESS,
                    messageKey: response.message
                });
                setTimeout(() => {
                    this.router.navigate([this.forwardUrl]);
                }, 1000);
            },
            error: this.handleError({
                message: 'An error occurred while sending the password reset email',
                context: `${this.constructor.name}#save`
            })
        });
    }


}