import { Injectable } from "@angular/core";
import { Constants } from "@common/constants/constants";
import { BaseHttpService } from "../base-http-service/base-http.service";
import { AlertTypeEnum } from "@common/enums";

@Injectable({
    providedIn: 'root'
})


export class ChangePwHttpService extends BaseHttpService<String> {

    protected override source: string = Constants.CHANGE_PASSWORD_URL;

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
            },
            error: this.handleError({
                message: 'An error occurred while updating the password',
                context: `${this.constructor.name}#changePassword`
            })
        });
    }
}