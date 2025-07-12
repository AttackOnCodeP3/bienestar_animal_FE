import {inject, Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {AuthHttpService} from '@services/http';
import {Observable, throwError} from 'rxjs';
import {HttpErrorResponse, HttpRequest, HttpStatusCode} from '@angular/common/http';
import {PagesUrlsEnum, RoutesUrlsEnum} from '@common/enums';
import {I18nHttpEnum} from '@common/enums/i18n';

/**
 * Global HTTP error handling service.
 * This service intercepts all HTTP errors and returns appropriate messages or actions
 * based on the status code and the backend response structure.
 *
 * - Handles auth-related errors by redirecting to login.
 * - Extracts structured error messages from backend.
 * - Converts errors into typed Error instances for downstream handling.
 *
 * @author dgutierrez
 */
@Injectable({
  providedIn: 'root'
})
export class ErrorHandlingService {
  private readonly authHttpService = inject(AuthHttpService);
  private readonly router = inject(Router);

  /**
   * Main handler for all HTTP errors intercepted in the application.
   * Determines how to process the error and returns a properly formatted throwable Error.
   *
   * @param error The intercepted HTTP error response.
   * @param req The original HTTP request that caused the error.
   * @returns An Observable that throws an Error instance with the appropriate message.
   * @author dgutierrez
   */
  handle(error: HttpErrorResponse, req: HttpRequest<any>): Observable<never> {
    const isAuthRequest = req.url.includes(RoutesUrlsEnum.AUTH);

    // Attempt to extract a meaningful error message from multiple backend formats
    const backendMessage =
      error?.error?.message || // structured { message: "...", meta: {...} }
      error?.message ||        // default Angular message
      'Unknown error';         // fallback

    const backendCode = error?.error?.code;

    switch (error.status) {
      case HttpStatusCode.Unauthorized:
      case HttpStatusCode.Forbidden:
        if (!isAuthRequest) {
          this.authHttpService.logout();
          this.router.navigateByUrl(PagesUrlsEnum.LOGIN);
          return throwError(() => new Error(I18nHttpEnum.UNAUTHORIZED));
        }
        return throwError(() => new Error(backendCode ?? I18nHttpEnum.UNAUTHORIZED));

      case HttpStatusCode.UnprocessableEntity:
        return throwError(() => error.error); // preserve original validation structure

      case HttpStatusCode.NotFound:
        return throwError(() => new Error(I18nHttpEnum.NOT_FOUND));

      case HttpStatusCode.BadRequest:
        // Custom handling for 400 with structured backend message
        return throwError(() => new Error(backendMessage));

      default:
        return throwError(() => new Error(backendCode ?? backendMessage));
    }
  }
}
