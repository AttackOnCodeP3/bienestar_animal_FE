import {Injectable, signal} from '@angular/core';
import {createPageArray} from '@common/utils';
import {ISearch} from '@common/interfaces/http';
import {Constants} from '@common/constants/constants';
import {AnimalType} from '@models';
import {BaseHttpService} from '@services/http';

/**
 * Service for managing animal types via HTTP requests.
 * @author dgutierrez
 */
@Injectable({
  providedIn: 'root'
})
export class AnimalTypesHttpService extends BaseHttpService<AnimalType> {


  protected override source = Constants.ANIMAL_TYPES_URL;

  readonly animalTypesList = signal<AnimalType[]>([]);

  search: ISearch = {
    page: 1,
    size: 10
  };

  totalItems: number[] = [];

  /**
   * Fetches all animal types paginated and updates signal state
   *
   * @author dgutierrez
   */
  getAll(): void {
    this.fetchAllPaginated({
      updateSignal: this.animalTypesList,
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
   * Fetches a single animal type by ID
   * @param id Animal type ID
   * @returns Observable<AnimalType>
   * @author dgutierrez
   */
  getOneById(id: number) {
    return this.getOne(id);
  }
}
