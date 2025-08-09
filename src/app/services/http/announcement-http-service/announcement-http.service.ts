import {computed, Injectable, signal} from '@angular/core';
import {BaseHttpService} from '@services/http';
import {Constants} from '@common/constants/constants';
import {Announcement} from '@models';
import {IHttpActionConfig, IResponse, ISearch, ISearchAnnouncement} from '@common/interfaces/http';
import {CreateAnnouncementFormDTO, UpdateAnnouncementFormDTO} from '@models/dto';
import {AlertTypeEnum} from '@common/enums';
import {finalize} from 'rxjs';

/**
 * Service to handle HTTP requests related to announcements.
 * @author dgutierrez
 */
@Injectable({
  providedIn: 'root',
})
export class AnnouncementHttpService extends BaseHttpService<Announcement> {
  protected override source = Constants.ANNOUNCEMENTS_URL;

  readonly announcementList = signal<Announcement[]>([]);
  readonly selectedAnnouncement = signal<Announcement | null>(null);
  private readonly isLoading = signal<boolean>(false);
  private readonly hasSearched = signal<boolean>(false);

  readonly hasSearchedAnnouncements = computed(() => this.hasSearched());
  readonly isAnnouncementsLoading = computed(() => this.isLoading());
  readonly isAnnouncementsEmpty = computed(() => {
    return this.announcementList().length === 0 && !this.isLoading();
  });

  search: ISearch = {
    page: 1,
    size: 10,
  };

  totalItems: number[] = [];

  get searchPage(): number {
    return this.search.page ?? 1;
  }

  /**
   * Loads paginated and optionally filtered announcements from the user's municipality.
   * @param filters Object containing optional title and stateId filters.
   * @param options Optional pagination control.
   * @author dgutierrez
   */
  getAllAnnouncementsByMunicipality(
    filters: ISearchAnnouncement = {},
    options: {
      page?: number;
      nextPage?: boolean;
      previousPage?: boolean;
    } = {}
  ): void {
    this.search = this.updatePageState(this.search, options);
    this.fetchAnnouncements(filters);
  }

  /**
   * Fetches a specific announcement belonging to the user's municipality.
   * @param id Announcement ID
   * @param config Optional callbacks and loading handlers
   * @author dgutierrez
   */
  getMyMunicipalityAnnouncementById(id: number, config?: IHttpActionConfig): void {
    this.isLoading.set(true);
    config?.showLoading?.();

    this.http.get<IResponse<Announcement>>(`${this.sourceUrl}/my-municipality/${id}`)
      .pipe(
        finalize(() => {
          this.isLoading.set(false);
          config?.hideLoading?.();
        })
      )
      .subscribe({
        next: (res) => {
          this.selectedAnnouncement.set(res.data);
          config?.callback?.();
        },
        error: this.handleError({
          message: 'Error fetching announcement from your municipality.',
          context: `${this.constructor.name}#getMyMunicipalityAnnouncementById`,
        }),
      });
  }

  /**
   * Sends a multipart/form-data request to create a new announcement
   * associated with the currently authenticated user's municipality.
   *
   * Accepts an optional configuration object for:
   * - callback: executed after successful creation
   * - showLoading: executed before request starts
   * - hideLoading: executed after request completes
   *
   * @param dto Form DTO containing all required fields.
   * @param config Optional configuration with callbacks and loading handlers.
   * @author dgutierrez
   */
  createAnnouncement(
    dto: CreateAnnouncementFormDTO,
    config?: IHttpActionConfig
  ): void {
    this.isLoading.set(true);
    config?.showLoading?.();

    const formData = dto.toFormData();

    this.http.post<IResponse<Announcement>>(`${this.sourceUrl}/my-municipality`, formData)
      .pipe(
        finalize(() => {
          this.isLoading.set(false);
          config?.hideLoading?.();
        })
      )
      .subscribe({
        next: (response) => {
          this.selectedAnnouncement.set(response.data);
          this.alertService.displayAlert({
            type: AlertTypeEnum.SUCCESS,
            message: response.message
          });
          config?.callback?.();
        },
        error: this.handleError({
          message: 'Error creating announcement.',
          context: `${this.constructor.name}#createAnnouncement`,
        }),
      });
  }

  /**
   * Updates an existing announcement associated with the authenticated user's municipality.
   * Uses multipart/form-data with updated fields and optional image file.
   *
   * @param id ID of the announcement to update
   * @param dto Form DTO containing updated fields
   * @param config Optional callbacks and loading handlers
   * @author dgutierrez
   */
  updateAnnouncement(
    id: number,
    dto: UpdateAnnouncementFormDTO,
    config?: IHttpActionConfig
  ): void {
    this.isLoading.set(true);
    config?.showLoading?.();

    const formData = dto.toFormData();

    this.http.put<IResponse<Announcement>>(`${this.sourceUrl}/my-municipality/${id}`, formData)
      .pipe(
        finalize(() => {
          this.isLoading.set(false);
          config?.hideLoading?.();
        })
      )
      .subscribe({
        next: (response) => {
          this.selectedAnnouncement.set(response.data);
          this.alertService.displayAlert({
            type: AlertTypeEnum.SUCCESS,
            message: response.message
          });
          config?.callback?.();
        },
        error: this.handleError({
          message: 'Error updating announcement.',
          context: `${this.constructor.name}#updateAnnouncement`,
        }),
      });
  }

  /**
   * Internally fetches filtered announcements for the authenticated user's municipality.
   * @param filters Object containing title and stateId (optional).
   * @author dgutierrez
   */
  private fetchAnnouncements(filters: { title?: string; stateId?: number } = {}): void {
    const params = {
      page: this.search.page,
      size: this.search.size,
      ...filters,
    };

    this.isLoading.set(true);
    this.http
      .get<IResponse<Announcement[]>>(`${this.sourceUrl}/my-municipality/filter`, {
        params: this.buildUrlParams(params),
      })
      .subscribe({
        next: (res) => {
          this.announcementList.set(res.data);
          this.search = {...this.search, ...res.meta};
          this.updatePagination(res.meta?.totalPages ?? 0);
          this.hasSearched.set(true);
        },
        error: this.handleError({
          message: 'Error fetching announcements.',
          context: `${this.constructor.name}#fetchAnnouncements`,
        }),
        complete: () => {
          this.isLoading.set(false);
        },
      });
  }

  /**
   * Carga anuncios VISIBLES (PUBLISHED y vigentes por fecha) de la municipalidad del
   * usuario autenticado (COMMUNITY_USER o MUNICIPAL_ADMIN).
   *
   * @param options Control de paginación (page | nextPage | previousPage)
   * @author dgutierrez
   */
  getVisibleAnnouncementsByMunicipality(
    options: { page?: number; nextPage?: boolean; previousPage?: boolean } = {}
  ): void {
    this.search = this.updatePageState(this.search, options);
    this.fetchVisibleAnnouncements();
  }

  /**
   * Obtiene anuncios visibles de la municipalidad del usuario.
   * Interno: maneja paginación, señales y errores.
   * @author dgutierrez
   */
  private fetchVisibleAnnouncements(): void {
    const params = {
      page: this.search.page,
      size: this.search.size,
    };

    this.isLoading.set(true);

    this.http
      .get<IResponse<Announcement[]>>(
        `${this.sourceUrl}/my-municipality/visible`,
        { params: this.buildUrlParams(params) }
      )
      .pipe(finalize(() => this.isLoading.set(false)))
      .subscribe({
        next: (res) => {
          this.announcementList.set(res.data);
          this.search = { ...this.search, ...res.meta };
          this.updatePagination(res.meta?.totalPages ?? 0);
          this.hasSearched.set(true);
        },
        error: this.handleError({
          message: 'Error fetching visible announcements.',
          context: `${this.constructor.name}#fetchVisibleAnnouncements`,
        }),
      });
  }

  /**
   * Fetches a VISIBLE announcement (PUBLISHED y vigente) by ID
   * for the authenticated user's municipality (COMMUNITY_USER o MUNICIPAL_ADMIN).
   *
   * @param id Announcement ID
   * @param config Optional callbacks and loading handlers
   * @author dgutierrez
   */
  getVisibleAnnouncementById(id: number, config?: IHttpActionConfig): void {
    this.isLoading.set(true);
    config?.showLoading?.();

    this.http.get<IResponse<Announcement>>(`${this.sourceUrl}/my-municipality/visible/${id}`)
      .pipe(
        finalize(() => {
          this.isLoading.set(false);
          config?.hideLoading?.();
        })
      )
      .subscribe({
        next: (res) => {
          this.selectedAnnouncement.set(res.data);
          config?.callback?.();
        },
        error: this.handleError({
          message: 'Error fetching visible announcement by id.',
          context: `${this.constructor.name}#getVisibleAnnouncementById`,
        }),
      });
  }

  /**
   * Updates pagination metadata and limits overflow.
   * @param totalPages Total number of available pages.
   * @author dgutierrez
   */
  private updatePagination(totalPages: number): void {
    this.totalItems = Array.from({length: totalPages}, (_, i) => i + 1);
    if (this.searchPage > totalPages && totalPages > 0) {
      this.search.page = totalPages;
    }
  }
}
