/**
 * Interface for objects that have a unique identifier.
 * This is useful on functions that need to handle compareFn in selects or lists, for example.
 * @author dgutierrez
 */
export interface IIdentifiable {
  id: string | number;
}
