import {inject, Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {AuthHttpService} from '@services/http';
import {Observable, throwError} from 'rxjs';
import {HttpErrorResponse, HttpRequest, HttpStatusCode} from '@angular/common/http';
import {PagesUrlsEnum, RoutesUrlsEnum} from '@common/enums';
import {I18nHttpEnum} from '@common/enums/i18n';

/**
 * Service for handling HTTP errors globally.
 * It intercepts HTTP errors and performs actions based on the error status.
 * @author dgutierrez
 */
@Injectable({
  providedIn: 'root'
})
export class ErrorHandlingService {
  private readonly authHttpService = inject(AuthHttpService)
  private readonly router = inject(Router);

  /**
   * Handles HTTP errors based on their status code.
   * @param error The HTTP error response.
   * @param req The HTTP request that caused the error.
   * @author dgutierrez
   */
  handle(error: HttpErrorResponse, req: HttpRequest<any>): Observable<never> {
    const isAuthRequest = req.url.includes(RoutesUrlsEnum.AUTH);

    const backendCode = error?.error?.code;

    switch (error.status) {
      case HttpStatusCode.Unauthorized:
      case HttpStatusCode.Forbidden:
        if (!isAuthRequest) {
          this.authHttpService.logout();
          this.router.navigateByUrl(PagesUrlsEnum.LOGIN);
          return throwError(() => new Error(I18nHttpEnum.UNAUTHORIZED));
        }

        // If a custom `description` comes from the backend, we return it as is.
        return throwError(() => new Error(backendCode ?? I18nHttpEnum.UNAUTHORIZED));

      case HttpStatusCode.UnprocessableEntity:
        return throwError(() => error.error); // Keep the original structure of the error

      case HttpStatusCode.NotFound:
        return throwError(() => new Error(I18nHttpEnum.NOT_FOUND));

      default:
        return throwError(() => new Error(backendCode ?? error.message));
    }
  }
}
