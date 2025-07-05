/**
 * Enum for HTTP-related internationalization keys.
 * @author dgutierrez
 */
export enum I18nHttpEnum {
  HTTP_ERROR = 'httpErrors.',
  NO_INTERNET_CONNECTION = I18nHttpEnum.HTTP_ERROR + 'noInternetConnection',
  BAD_REQUEST = I18nHttpEnum.HTTP_ERROR + 'badRequest',
  INTERNAL_SERVER_ERROR = I18nHttpEnum.HTTP_ERROR + 'internalServerError',
  NOT_FOUND = I18nHttpEnum.HTTP_ERROR + 'notFound',
  SERVICE_UNAVAILABLE = I18nHttpEnum.HTTP_ERROR + 'serviceUnavailable',
  UNAUTHORIZED = I18nHttpEnum.HTTP_ERROR + 'unauthorized',
}
