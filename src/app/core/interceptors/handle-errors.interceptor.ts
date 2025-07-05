import {HttpInterceptorFn, HttpErrorResponse} from '@angular/common/http';
import {inject} from '@angular/core';
import {catchError} from 'rxjs';
import {ErrorHandlingService} from '@services/general';

/**
 * Interceptor to handle HTTP errors globally.
 * @param req - The HTTP request being made.
 * @param next - The next interceptor in the chain.
 * @return An observable that emits the HTTP response or handles the error.
 * @author dgutierrez
 */
export const handleErrorsInterceptor: HttpInterceptorFn = (req, next) => {
  const errorHandlingService = inject(ErrorHandlingService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      return errorHandlingService.handle(error, req);
    })
  );
};
