/**
 * Interface for a generic HTTP response.
 * @author dgutierrez
 */
export interface IResponse<T, M = any> {
  data: T;
  message: string;
  meta: M;
}
