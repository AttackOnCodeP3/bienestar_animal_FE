/**
 * Interface for a generic HTTP response.
 * @author dgutierrez
 */
export interface IResponse<T> {
  data: T;
  message: string,
  meta: T;
}
