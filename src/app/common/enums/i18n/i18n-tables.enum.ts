/**
 * Enum for i18n keys related to tables.
 * This enum is used to define keys for table-related messages and labels.
 * @author dgutierrez
 */
export enum I18nTablesEnum {
  TABLES = 'tables.',
  COLUMNS = I18nTablesEnum.TABLES + 'columns.',

  COLUMN_NAME = I18nTablesEnum.COLUMNS + 'name',
  COLUMN_LASTNAME = I18nTablesEnum.COLUMNS + 'lastname',
  COLUMN_EMAIL = I18nTablesEnum.COLUMNS + 'email',
  COLUMN_ACTIVE = I18nTablesEnum.COLUMNS + 'active',
  COLUMN_ACTIONS = I18nTablesEnum.COLUMNS + 'actions',
  COLUMN_PHONE_NUMBER = I18nTablesEnum.COLUMNS + 'phoneNumber',
  COLUMN_ACTIVATE_DESACTIVATE = I18nTablesEnum.COLUMNS + 'activateDesactivate',
  COLUMN_BLOCK = I18nTablesEnum.COLUMNS + 'block',
}
