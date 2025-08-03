import {computed, Injectable, signal} from '@angular/core';
import {BaseHttpService} from '@services/http/base-http-service/base-http.service';
import {Constants} from '@common/constants/constants';
import {ISearch, IResponse} from '@common/interfaces/http';
import {createPageArray} from '@common/utils';
import {AnnouncementState} from '@models';

/**
 * Service to handle HTTP requests related to announcement states.
 * @author dgutierrez
 */
@Injectable({
  providedIn: 'root'
})
export class AnnouncementStateHttpService extends BaseHttpService<AnnouncementState> {

  protected override source = Constants.ANNOUNCEMENT_STATES_URL;

  readonly announcementStatesList = signal<AnnouncementState[]>([]);
  readonly selectedState = signal<AnnouncementState | null>(null);

  private readonly isLoading = signal<boolean>(false);
  readonly isStatesLoading = computed(() => this.isLoading());
  readonly isStatesEmpty = computed(() =>
    this.announcementStatesList().length === 0 && !this.isLoading()
  );

  search: ISearch = {
    page: 1,
    size: 20
  };

  totalItems: number[] = [];

  /**
   * Fetches all announcement states paginated from backend
   * and updates signal and pagination metadata.
   * @author dgutierrez
   */
  getAll(): void {
    this.fetchAllPaginated({
      updateSignal: this.announcementStatesList,
      page: this.search.page || 1,
      size: this.search.size || 20,
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
   * Fetches a single announcement state by ID and stores it in signal.
   * @param id ID to fetch
   * @param callback Optional callback to invoke after fetch
   * @author dgutierrez
   */
  getById(id: number, callback?: VoidFunction): void {
    this.http.get<IResponse<AnnouncementState>>(`${this.sourceUrl}/${id}`).subscribe({
      next: (res) => {
        this.selectedState.set(res.data);
        callback?.();
      },
      error: this.handleError({
        message: 'Ocurrió un error al obtener el estado del anuncio.',
        context: `${this.constructor.name}#getById`
      })
    });
  }
}
