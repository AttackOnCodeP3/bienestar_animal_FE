/**
 * Interface for the data passed to a confirm action modal.
 * @author dgutierrez
 */
export interface IConfirmActionModalData {
  title?: string;
  message?: string;
  confirmButtonText?: string;
  cancelButtonText?: string;
  showCancelButton?: boolean;
  matIconName?: string;
}
