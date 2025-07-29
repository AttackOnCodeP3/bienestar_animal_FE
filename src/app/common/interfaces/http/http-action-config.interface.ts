/**
 * Generic interface for configuring HTTP actions with optional lifecycle hooks.
 * Useful for operations that support loading indicators and success callbacks.
 *
 * @template T Type of the value passed to the callback on success.
 * @author dgutierrez
 */
export interface IHttpActionConfig<T = void> {
  /**
   * Optional function to show a loading indicator before the HTTP call.
   */
  showLoading?: () => void;

  /**
   * Optional function to hide the loading indicator after the HTTP call completes.
   */
  hideLoading?: () => void;

  /**
   * Optional callback function to execute on success.
   * Can receive the result value of type T.
   */
  callback?: (result: T) => void;
}
