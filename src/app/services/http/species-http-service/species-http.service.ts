import {Injectable, signal} from '@angular/core';
import {createPageArray} from '@common/utils';
import {ISearch} from '@common/interfaces/http';
import {Constants} from '@common/constants/constants';
import {Species} from '@models';
import {BaseHttpService} from '@services/http';

/**
 * Service for handling HTTP requests related to species of animals.
 * @author dgutierrez
 */
@Injectable({
  providedIn: 'root'
})
export class SpeciesHttpService extends BaseHttpService<Species> {

  protected override source = Constants.SPECIES_URL;

  readonly speciesList = signal<Species[]>([]);

  search: ISearch = {
    page: 1,
    size: 10
  };

  totalItems: number[] = [];

  /**
   * Fetches all species paginated from the backend
   * and updates the signal and pagination metadata.
   * @author dgutierrez
   */
  getAll(): void {
    this.fetchAllPaginated({
      updateSignal: this.speciesList,
      page: this.search.page || 1,
      size: this.search.size || 10,
      setSearchMeta: (meta) => {
        this.search = { ...this.search, ...meta };
      },
      setTotalItems: (totalPages) => {
        this.totalItems = createPageArray(totalPages);
      },
      context: `${this.constructor.name}#getAll`
    });
  }

  /**
   * Fetches a single species by ID
   * @param id Species ID
   * @returns Observable<Species>
   * @author dgutierrez
   */
  getOneById(id: number) {
    return this.getOne(id);
  }
}
