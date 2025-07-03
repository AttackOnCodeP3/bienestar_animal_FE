/**
 * Enum for i18n messages used in the application.
 * This enum contains keys for various messages that can be used in the application,
 * @author dgutierrez
 */
export enum I18nMessagesEnum {
  MAT_SNACK_BAR_MESSAGE_SUCCESS = 'matSnackBarMessages.',
  HTTP_MESSAGES = "http.",

  MAT_SNACK_HTTP_OPERATION_COMPLETED_SUCCESSFULLY = I18nMessagesEnum.MAT_SNACK_BAR_MESSAGE_SUCCESS + I18nMessagesEnum.HTTP_MESSAGES + 'operationCompletedSuccessfully',
  MAT_SNACK_HTTP_AN_ERROR_OCCURRED_PLEASE_TRY_AGAIN = I18nMessagesEnum.MAT_SNACK_BAR_MESSAGE_SUCCESS + I18nMessagesEnum.HTTP_MESSAGES + 'anErrorOccurredPleaseTryAgain',
  MAT_SNACK_HTTP_HERE_IS_SOME_INFORMATION = I18nMessagesEnum.MAT_SNACK_BAR_MESSAGE_SUCCESS + I18nMessagesEnum.HTTP_MESSAGES + 'hereIsSomeInformation',
  MAT_SNACK_HTTP_WARNING_PLEASE_CHECK_THE_DATA = I18nMessagesEnum.MAT_SNACK_BAR_MESSAGE_SUCCESS + I18nMessagesEnum.HTTP_MESSAGES + 'warningPleaseCheckTheData',
  MAT_SNACK_HTTP_NOTIFICATION = I18nMessagesEnum.MAT_SNACK_BAR_MESSAGE_SUCCESS + I18nMessagesEnum.HTTP_MESSAGES + 'notification'
}
