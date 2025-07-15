import {Injectable, signal} from '@angular/core';
import {BaseHttpService} from '@services/http';
import {Race} from '@models';
import {Constants} from '@common/constants/constants';
import {ISearch} from '@common/interfaces/http';
import {createPageArray} from '@common/utils';

/**
 * Service for handling HTTP requests related to races of animals.
 * @author dgutierrez
 */
@Injectable({
  providedIn: 'root'
})
export class RaceHttpService extends BaseHttpService<Race> {

  protected override source = Constants.RACES_URL;

  readonly raceList = signal<Race[]>([]);
  readonly raceListBySpecies = signal<Race[]>([]);

  search: ISearch = {
    page: 1,
    size: 500
  };

  totalItems: number[] = [];

  /**
   * Fetches all races paginated
   * @author dgutierrez
   */
  getAll(): void {
    this.fetchAllPaginated({
      updateSignal: this.raceList,
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
   * Fetches races by species ID (paginated)
   * @param speciesId ID of the species
   * @param page optional page number (default 1)
   * @param size optional page size (default 10)
   * @author dgutierrez
   */
  getBySpeciesId(speciesId: number, page: number = 1, size: number = 10): void {
    const customSource = `by-species/${speciesId}`;
    this.findAllWithParamsAndCustomSource(customSource, { page, size }).subscribe({
      next: (response) => {
        this.raceListBySpecies.set(response.data);
        this.search = { ...this.search, ...response.meta };
        this.totalItems = createPageArray(response.meta?.totalPages ?? 0);
      },
      error: this.handleError({
        message: 'Error fetching races by species',
        context: `${this.constructor.name}#getBySpeciesId`
      })
    });
  }

  /**
   * Fetches a single race by ID
   * @param id Race ID
   * @returns Observable<Race>
   * @author dgutierrez
   */
  getOneById(id: number) {
    return this.getOne(id);
  }
}
