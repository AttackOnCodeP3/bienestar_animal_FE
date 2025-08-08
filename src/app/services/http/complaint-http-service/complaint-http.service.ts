import {computed, Injectable, signal} from '@angular/core';
import {BaseHttpService} from '@services/http/base-http-service/base-http.service';
import {Constants} from '@common/constants/constants';
import {ComplaintDto, CreateComplaintMultipartDto} from '@models/dto';
import {IHttpActionConfig, IResponse, ISearch, ISearchComplaint} from '@common/interfaces/http';
import {finalize} from 'rxjs';
import {AlertTypeEnum} from '@common/enums';

/**
 * Service to handle HTTP requests related to complaints.
 * Includes creation for community users and filtered listing for municipal admins.
 * Supports configuration for loading handlers and callbacks.
 * @author dgutierrez
 */
@Injectable({
  providedIn: 'root'
})
export class ComplaintHttpService extends BaseHttpService<ComplaintDto> {
  protected override source = Constants.COMPLAINTS_URL;

  readonly complaintList = signal<ComplaintDto[]>([]);
  readonly selectedComplaint = signal<ComplaintDto | null>(null);
  private readonly isLoading = signal<boolean>(false);
  private readonly hasSearched = signal<boolean>(false);

  readonly isComplaintsLoading = computed(() => this.isLoading());
  readonly hasSearchedComplaints = computed(() => this.hasSearched());
  readonly isComplaintsEmpty = computed(() => {
    return this.complaintList().length === 0 && !this.isLoading();
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
   * Retrieves paginated and optionally filtered complaints for the authenticated MUNICIPAL_ADMIN.
   * @param config Configuration object with filters, pagination, and loading/callback handlers.
   * @author dgutierrez
   */
  getComplaintsOfAuthenticatedMunicipalityAdmin(config?: {
    filters?: ISearchComplaint,
    options?: { page?: number; nextPage?: boolean; previousPage?: boolean },
    handlers?: IHttpActionConfig
  }): void {
    const filters = config?.filters ?? {};
    const options = config?.options ?? {};
    const handlers = config?.handlers;

    this.search = this.updatePageState(this.search, options);
    this.fetchMunicipalComplaints(filters, handlers);
  }

  /**
   * Retrieves a complaint by ID for the authenticated MUNICIPAL_ADMIN.
   * Only returns the complaint if it belongs to their municipality.
   *
   * @param id The complaint ID to retrieve.
   * @param config Optional configuration for loading and callbacks.
   * @author dgutierrez
   */
  getComplaintByIdForMunicipalityAdmin(
    id: number,
    config?: IHttpActionConfig
  ): void {
    this.isLoading.set(true);
    config?.showLoading?.();

    this.http
      .get<IResponse<ComplaintDto>>(`${this.sourceUrl}/my-municipality/${id}`)
      .pipe(finalize(() => {
        this.isLoading.set(false);
        config?.hideLoading?.();
      }))
      .subscribe({
        next: (res) => {
          this.selectedComplaint.set(res.data);
          config?.callback?.();
        },
        error: this.handleError({
          message: 'Error fetching complaint for municipal admin.',
          context: `${this.constructor.name}#getComplaintByIdForMunicipalityAdmin`
        }),
      });
  }

  /**
   * Retrieves a complaint by ID for the authenticated COMMUNITY_USER.
   * Only returns the complaint if it was created by the user.
   *
   * @param id The complaint ID to retrieve.
   * @param config Optional configuration for loading and callbacks.
   * @author dgutierrez
   */
  getComplaintByIdForCommunityUser(
    id: number,
    config?: IHttpActionConfig
  ): void {
    this.isLoading.set(true);
    config?.showLoading?.();

    this.http
      .get<IResponse<ComplaintDto>>(`${this.sourceUrl}/my-complaints/${id}`)
      .pipe(finalize(() => {
        this.isLoading.set(false);
        config?.hideLoading?.();
      }))
      .subscribe({
        next: (res) => {
          this.selectedComplaint.set(res.data);
          config?.callback?.();
        },
        error: this.handleError({
          message: 'Error fetching complaint for community user.',
          context: `${this.constructor.name}#getComplaintByIdForCommunityUser`
        }),
      });
  }

  /**
   * Creates a complaint for the authenticated COMMUNITY_USER.
   * @param config Configuration object with complaint DTO and loading/callback handlers.
   * @author dgutierrez
   */
  createComplaint(config: {
    dto: CreateComplaintMultipartDto,
    handlers?: IHttpActionConfig
  }): void {
    const { dto, handlers } = config;
    this.isLoading.set(true);
    handlers?.showLoading?.();

    const formData = dto.toFormData();

    this.http.post<IResponse<ComplaintDto>>(this.sourceUrl, formData)
      .pipe(finalize(() => {
        this.isLoading.set(false);
        handlers?.hideLoading?.();
      }))
      .subscribe({
        next: (response) => {
          this.selectedComplaint.set(response.data);
          this.alertService.displayAlert({
            type: AlertTypeEnum.SUCCESS,
            message: response.message
          });
          handlers?.callback?.();
        },
        error: this.handleError({
          message: 'Error creating complaint.',
          context: `${this.constructor.name}#createComplaint`
        }),
      });
  }

  /**
   * Retrieves complaints created by the authenticated COMMUNITY_USER.
   * @param config Configuration object with filters, pagination, and loading/callback handlers.
   * @author dgutierrez
   */
  getMyComplaintsAsCommunityUser(config?: {
    filters?: ISearchComplaint,
    options?: { page?: number; nextPage?: boolean; previousPage?: boolean },
    handlers?: IHttpActionConfig
  }): void {
    const filters = config?.filters ?? {};
    const options = config?.options ?? {};
    const handlers = config?.handlers;

    this.search = this.updatePageState(this.search, options);
    const params = {
      page: this.search.page,
      size: this.search.size,
      ...filters,
    };

    this.isLoading.set(true);
    handlers?.showLoading?.();

    this.http.get<IResponse<ComplaintDto[]>>(`${this.sourceUrl}/my-complaints`, {
      params: this.buildUrlParams(params),
    }).pipe(finalize(() => {
      this.isLoading.set(false);
      handlers?.hideLoading?.();
    }))
      .subscribe({
        next: (res) => {
          this.complaintList.set(res.data);
          this.search = { ...this.search, ...res.meta };
          this.updatePagination(res.meta?.totalPages ?? 0);
          this.hasSearched.set(true);
          handlers?.callback?.();
        },
        error: this.handleError({
          message: 'Error fetching community complaints.',
          context: `${this.constructor.name}#getMyComplaintsAsCommunityUser`,
        }),
      });
  }

  /**
   * Internal method to retrieve complaints from authenticated MUNICIPAL_ADMIN's municipality.
   * @param filters Complaint filters.
   * @param config Optional loading and callback handlers.
   * @author dgutierrez
   */
  private fetchMunicipalComplaints(filters: ISearchComplaint = {}, config?: IHttpActionConfig): void {
    const params = {
      page: this.search.page,
      size: this.search.size,
      ...filters,
    };

    this.isLoading.set(true);
    config?.showLoading?.();

    this.http
      .get<IResponse<ComplaintDto[]>>(`${this.sourceUrl}/my-municipality/filter`, {
        params: this.buildUrlParams(params),
      })
      .pipe(finalize(() => {
        this.isLoading.set(false);
        config?.hideLoading?.();
      }))
      .subscribe({
        next: (res) => {
          this.complaintList.set(res.data);
          this.search = { ...this.search, ...res.meta };
          this.updatePagination(res.meta?.totalPages ?? 0);
          this.hasSearched.set(true);
          config?.callback?.();
        },
        error: this.handleError({
          message: 'Error fetching complaints.',
          context: `${this.constructor.name}#fetchMunicipalComplaints`,
        }),
      });
  }

  /**
   * Updates pagination state based on total pages returned.
   * @param totalPages Total number of available pages.
   * @author dgutierrez
   */
  private updatePagination(totalPages: number): void {
    this.totalItems = Array.from({ length: totalPages }, (_, i) => i + 1);
    if (this.searchPage > totalPages && totalPages > 0) {
      this.search.page = totalPages;
    }
  }
}
