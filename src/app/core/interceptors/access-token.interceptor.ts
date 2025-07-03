import {HttpInterceptorFn} from '@angular/common/http';
import {inject} from '@angular/core';
import {AuthHttpService} from '@services/http';
import {RoutesUrlsEnum} from '@common/enums';
import {LogService} from '@services/general';

/**
 * Appends the access token to all HTTP requests except those targeting authentication routes.
 *
 * - Skips token injection for unauthenticated users.
 * - Skips token injection for requests to authentication endpoints.
 * - Logs every decision for debugging purposes.
 *
 * @param req The outgoing HTTP request
 * @param next The next handler in the interceptor chain
 * @returns The (possibly modified) HTTP request
 * @author dgutierrez
 */
export const accessTokenInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthHttpService);
  const logService = inject(LogService);

  // Skip token addition for auth-related routes
  const isAuthRequest = req.url.includes(RoutesUrlsEnum.AUTH);
  if (isAuthRequest) {
    logService.debug({
      message: 'Access token interceptor: authentication route detected. Token injection skipped.',
      data: { url: req.url }
    });
    return next(req);
  }

  // Skip if user is not authenticated
  if (!authService.isAuthenticated()) {
    logService.debug({
      message: 'Access token interceptor: user not authenticated. Token injection skipped.',
      data: { url: req.url }
    });
    return next(req);
  }

  const rawToken = authService.accessToken();
  const cleanToken = sanitizeToken(rawToken);

  if (!cleanToken) {
    logService.warn({
      message: 'Access token interceptor: token was expected but not found.',
      data: { url: req.url }
    });
    return next(req);
  }

  logService.debug({
    message: 'Access token interceptor: injecting access token into request.',
    data: { token: cleanToken, url: req.url }
  });

  const clonedRequest = req.clone({
    setHeaders: {
      Authorization: `Bearer ${cleanToken}`,
    },
  });

  return next(clonedRequest);
};

/**
 * Removes double quotes from the token, ensuring a clean format.
 *
 * @param token The raw access token
 * @returns A sanitized token string or undefined if invalid
 * @author dgutierrez
 */
function sanitizeToken(token?: string | null): string | undefined {
  return typeof token === 'string' ? token.replace(/"/g, '') : undefined;
}
