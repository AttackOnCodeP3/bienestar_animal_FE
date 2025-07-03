/**
 * Interface representing a paginated search result.
 * @author dgutierrez
 */
export interface ISearch {
  page?: number;
  size?: number;
  pageNumber?: number;
  pageSize?: number;
  totalElements?: number;
  totalPages?:number;
}
