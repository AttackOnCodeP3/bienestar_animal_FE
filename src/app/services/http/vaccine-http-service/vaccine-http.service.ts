import {Injectable, signal} from '@angular/core';
import {BaseHttpService} from '@services/http/base-http-service/base-http.service';
import {Vaccine} from '@models';
import {ISearch} from '@common/interfaces/http';
import {Constants} from '@common/constants/constants';
import {createPageArray} from '@common/utils';

/**
 * Service for handling HTTP requests related to vaccines.
 * @author dgutierrez
 */
@Injectable({
  providedIn: 'root'
})
export class VaccineHttpService extends BaseHttpService<Vaccine> {

  protected override source = Constants.VACCINE_URL;
  private readonly sourceBySpecies = `${Constants.VACCINE_BY_SPECIES_URL}/`;

  readonly vaccineList = signal<Vaccine[]>([]);
  readonly vaccineListBySpecies = signal<Vaccine[]>([]);

  search: ISearch = {
    page: 1,
    size: 10
  };

  totalItems: number[] = [];

  /**
   * Fetches all vaccines paginated
   * GET /vaccines
   * @author dgutierrez
   */
  getAll(): void {
    this.fetchAllPaginated({
      updateSignal: this.vaccineList,
      page: this.search.page || 1,
      size: this.search.size || 10,
      setSearchMeta: (meta) => {
        this.search = {...this.search, ...meta};
      },
      setTotalItems: (totalPages) => {
        this.totalItems = createPageArray(totalPages);
      },
      context: `${this.constructor.name}#getAll`
    });
  }

  /**
   * Fetches a vaccine by its ID
   * GET /vaccines/{id}
   * @author dgutierrez
   */
  getOneById(id: number) {
    return this.getOne(id);
  }

  /**
   * Fetches vaccines for a given species ID with pagination
   * GET /vaccines/by-species/{speciesId}?page=X&size=Y
   * @author dgutierrez
   */
  getBySpecies(speciesId: number): void {
    const customUrlSource = this.sourceBySpecies + speciesId;
    this.findAllWithParamsAndCustomSource(customUrlSource, {
      page: this.search.page || 1,
      size: this.search.size || 10,
    }).subscribe({
      next: (res) => {
        this.search = {...this.search, ...res.meta};
        this.totalItems = createPageArray(res.meta?.totalPages ?? 0);
        this.vaccineListBySpecies.set(res.data);
      },
      error: this.handleError({
        message: 'Error fetching vaccines by species',
        context: `${this.constructor.name}#getBySpecies`
      })
    });
  }
}
