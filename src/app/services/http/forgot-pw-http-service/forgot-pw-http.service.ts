import { Injectable } from "@angular/core";
import { Constants } from "@common/constants/constants";
import { User } from "@models";
import { BaseHttpService } from "../base-http-service/base-http.service";
import { AlertTypeEnum } from "@common/enums/alert-type.enum";
import { PagesUrlsEnum } from "@common/enums";

@Injectable({
    providedIn: 'root'
})

export class ForgotPwHttpService extends BaseHttpService<String> {

    protected override source: string = Constants.FORGOT_PASSWORD_URL;
    readonly forwardUrl: string = PagesUrlsEnum.LOGIN;

    save(email: string): void {
        this.add({ email: email }).subscribe({
            next: (response) => {
            this.alertService.displayAlert({
                type: AlertTypeEnum.SUCCESS,
                messageKey: response.message
            });
            setTimeout(() => {
                window.location.href = this.forwardUrl;
            }, 2000);
            return;

            },
            error: this.handleError({
            message: 'An error occurred while sending the password reset email',
            context: `${this.constructor.name}#save`
            })
        });
    }


}