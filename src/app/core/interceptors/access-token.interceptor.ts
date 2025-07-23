import {HttpInterceptorFn} from '@angular/common/http';
import {inject} from '@angular/core';
import {AuthHttpService} from '@services/http';
import {RoutesUrlsEnum} from '@common/enums';
import {LogService} from '@services/general';
import {Constants} from '@common/constants/constants';

/**
 * HTTP interceptor that appends the access token to outgoing HTTP requests
 * unless the request matches certain authentication routes that are explicitly excluded.
 *
 * Responsibilities:
 * - Appends the Bearer token to authorized requests.
 * - Skips token injection for:
 *   - Requests to authentication endpoints (e.g., /auth/**), unless explicitly whitelisted.
 *   - Requests made by users not yet authenticated.
 * - Uses an allowList for authentication routes that *do* require a token (e.g., social login profile completion).
 * - Logs all decisions (skips, injection) for easier debugging.
 *
 * Note: This is essential for flows where a JWT is issued before the user has fully completed registration.
 *
 * @param req The outgoing HTTP request
 * @param next The next handler in the HTTP interceptor chain
 * @returns The (possibly modified) HTTP request passed to the next interceptor or sent to the backend
 * @author dgutierrez
 */
export const accessTokenInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthHttpService);
  const logService = inject(LogService);

  const url = req.url || '';

  const isAuthRequest = url.includes(RoutesUrlsEnum.AUTH);

  const allowList: string[] = [
    Constants.apiBaseUrl + Constants.AUTH_SOCIAL_COMPLETE_USER_PROFILE_URL
  ];

  const isWhitelisted = allowList.some(allowedUrl => url.startsWith(allowedUrl));

  if (isAuthRequest && !isWhitelisted) {
    logService.debug({
      message: 'Access token interceptor: authentication route detected and not whitelisted. Token injection skipped.',
      data: { url }
    });
    return next(req);
  }

  if (!authService.isAuthenticated()) {
    logService.debug({
      message: 'Access token interceptor: user not authenticated. Token injection skipped.',
      data: { url }
    });
    return next(req);
  }

  const rawToken = authService.accessToken();
  const cleanToken = sanitizeToken(rawToken);

  if (!cleanToken) {
    logService.warn({
      message: 'Access token interceptor: token was expected but not found.',
      data: { url }
    });
    return next(req);
  }

  logService.debug({
    message: 'Access token interceptor: injecting access token into request.',
    data: { token: cleanToken, url }
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
