/**
 * Configuration interface for logging
 * @author dgutierrez
 */
export interface IDebugOptions<T> {
  message: any;
  data?: T;
  className?: string;
  lineBreak?: boolean;
  error?: any;
}
