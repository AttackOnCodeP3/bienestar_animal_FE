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
   * Loads paginated and optionally filtered complaints that belong to
   * the municipality of the authenticated MUNICIPAL_ADMIN.
   *
   * Only accessible to users with the MUNICIPAL_ADMIN role.
   *
   * @param filters Optional complaint type and state filters.
   * @param options Optional pagination control.
   * @author dgutierrez
   */
  getComplaintsOfAuthenticatedMunicipalityAdmin(
    filters: ISearchComplaint = {},
    options: { page?: number; nextPage?: boolean; previousPage?: boolean } = {}
  ): void {
    this.search = this.updatePageState(this.search, options);
    this.fetchMunicipalComplaints(filters);
  }

  /**
   * Sends a multipart/form-data request to create a new complaint
   * associated with the currently authenticated COMMUNITY_USER.
   *
   * Accepts an optional configuration object for:
   * - callback: executed after successful creation
   * - showLoading: invoked before request starts
   * - hideLoading: invoked after request completes
   *
   * @param dto Multipart form containing complaint data.
   * @param config Optional callbacks and loading handlers.
   * @author dgutierrez
   */
  createComplaint(
    dto: CreateComplaintMultipartDto,
    config?: IHttpActionConfig
  ): void {
    this.isLoading.set(true);
    config?.showLoading?.();

    const formData = dto.toFormData();

    this.http.post<IResponse<ComplaintDto>>(this.sourceUrl, formData)
      .pipe(finalize(() => {
        this.isLoading.set(false);
        config?.hideLoading?.();
      }))
      .subscribe({
        next: (response) => {
          this.selectedComplaint.set(response.data);
          this.alertService.displayAlert({
            type: AlertTypeEnum.SUCCESS,
            message: response.message
          });
          config?.callback?.();
        },
        error: this.handleError({
          message: 'Error creating complaint.',
          context: `${this.constructor.name}#createComplaint`
        }),
      });
  }

  /**
   * Retrieves complaints created by the authenticated COMMUNITY_USER.
   * Supports optional filtering by complaint type and state.
   * Updates internal list and pagination state.
   * @author dgutierrez
   */
  getMyComplaintsAsCommunityUser(
    filters: ISearchComplaint = {},
    options: { page?: number; nextPage?: boolean; previousPage?: boolean } = {}
  ): void {
    this.search = this.updatePageState(this.search, options);
    const params = {
      page: this.search.page,
      size: this.search.size,
      ...filters,
    };

    this.isLoading.set(true);
    this.http.get<IResponse<ComplaintDto[]>>(`${this.sourceUrl}/my-complaints`, {
      params: this.buildUrlParams(params),
    }).pipe(finalize(() => this.isLoading.set(false)))
      .subscribe({
        next: (res) => {
          this.complaintList.set(res.data);
          this.search = { ...this.search, ...res.meta };
          this.updatePagination(res.meta?.totalPages ?? 0);
          this.hasSearched.set(true);
        },
        error: this.handleError({
          message: 'Error fetching community complaints.',
          context: `${this.constructor.name}#getMyComplaintsAsCommunityUser`,
        }),
      });
  }

  /**
   * Approves a complaint. Only accessible to MUNICIPAL_ADMIN users.
   * @param id Complaint ID
   * @param config Optional callbacks and loading handlers
   * @author dgutierrez
   */
  approveComplaint(id: number, config?: IHttpActionConfig): void {
    this.isLoading.set(true);
    config?.showLoading?.();

    this.http.put<IResponse<ComplaintDto>>(`${this.sourceUrl}/${id}/approve`, null)
      .pipe(finalize(() => {
        this.isLoading.set(false);
        config?.hideLoading?.();
      }))
      .subscribe({
        next: (res) => {
          this.selectedComplaint.set(res.data);
          this.alertService.displayAlert({
            type: AlertTypeEnum.SUCCESS,
            message: res.message,
          });
          config?.callback?.();
        },
        error: this.handleError({
          message: 'Error approving complaint.',
          context: `${this.constructor.name}#approveComplaint`,
        }),
      });
  }

  /**
   * Adds observations to a complaint and changes its state.
   * Only MUNICIPAL_ADMIN users can perform this action.
   * @param id Complaint ID
   * @param observations Text for observations
   * @param config Optional callbacks and loading handlers
   * @author dgutierrez
   */
  observeComplaint(id: number, observations: string, config?: IHttpActionConfig): void {
    this.isLoading.set(true);
    config?.showLoading?.();

    this.http.put<IResponse<ComplaintDto>>(
      `${this.sourceUrl}/${id}/observe`,
      { observations }
    ).pipe(finalize(() => {
      this.isLoading.set(false);
      config?.hideLoading?.();
    })).subscribe({
      next: (res) => {
        this.selectedComplaint.set(res.data);
        this.alertService.displayAlert({
          type: AlertTypeEnum.SUCCESS,
          message: res.message,
        });
        config?.callback?.();
      },
      error: this.handleError({
        message: 'Error adding observations.',
        context: `${this.constructor.name}#observeComplaint`,
      }),
    });
  }

  /**
   * Resubmits a complaint that was returned with observations.
   * Only the original COMMUNITY_USER can resubmit.
   * @param id Complaint ID
   * @param config Optional callbacks and loading handlers
   * @author dgutierrez
   */
  resubmitComplaint(id: number, config?: IHttpActionConfig): void {
    this.isLoading.set(true);
    config?.showLoading?.();

    this.http.put<IResponse<ComplaintDto>>(`${this.sourceUrl}/${id}/resubmit`, null)
      .pipe(finalize(() => {
        this.isLoading.set(false);
        config?.hideLoading?.();
      }))
      .subscribe({
        next: (res) => {
          this.selectedComplaint.set(res.data);
          this.alertService.displayAlert({
            type: AlertTypeEnum.SUCCESS,
            message: res.message,
          });
          config?.callback?.();
        },
        error: this.handleError({
          message: 'Error resubmitting complaint.',
          context: `${this.constructor.name}#resubmitComplaint`,
        }),
      });
  }

  /**
   * Completes a complaint. Only possible if the state is "Approved".
   * MUNICIPAL_ADMIN only.
   * @param id Complaint ID
   * @param config Optional callbacks and loading handlers
   * @author dgutierrez
   */
  completeComplaint(id: number, config?: IHttpActionConfig): void {
    this.isLoading.set(true);
    config?.showLoading?.();

    this.http.put<IResponse<ComplaintDto>>(`${this.sourceUrl}/${id}/complete`, null)
      .pipe(finalize(() => {
        this.isLoading.set(false);
        config?.hideLoading?.();
      }))
      .subscribe({
        next: (res) => {
          this.selectedComplaint.set(res.data);
          this.alertService.displayAlert({
            type: AlertTypeEnum.SUCCESS,
            message: res.message,
          });
          config?.callback?.();
        },
        error: this.handleError({
          message: 'Error completing complaint.',
          context: `${this.constructor.name}#completeComplaint`,
        }),
      });
  }

  /**
   * Internal method to fetch complaints from the backend for the municipality
   * of the currently authenticated MUNICIPAL_ADMIN.
   *
   * Used by getComplaintsOfAuthenticatedMunicipalityAdmin.
   *
   * @param filters Optional complaint type and state filters.
   * @author dgutierrez
   */
  private fetchMunicipalComplaints(filters: ISearchComplaint = {},): void {
    const params = {
      page: this.search.page,
      size: this.search.size,
      ...filters,
    };

    this.isLoading.set(true);
    this.http
      .get<IResponse<ComplaintDto[]>>(`${this.sourceUrl}/my-municipality/filter`, {
        params: this.buildUrlParams(params),
      })
      .pipe(finalize(() => this.isLoading.set(false)))
      .subscribe({
        next: (res) => {
          this.complaintList.set(res.data);
          this.search = {...this.search, ...res.meta};
          this.updatePagination(res.meta?.totalPages ?? 0);
          this.hasSearched.set(true);
        },
        error: this.handleError({
          message: 'Error fetching complaints.',
          context: `${this.constructor.name}#fetchMunicipalComplaints`,
        }),
      });
  }

  /**
   * Updates the pagination state based on total number of pages.
   * Prevents navigating to pages beyond the available range.
   *
   * @param totalPages Total number of pages from the response.
   * @author dgutierrez
   */
  private updatePagination(totalPages: number): void {
    this.totalItems = Array.from({length: totalPages}, (_, i) => i + 1);
    if (this.searchPage > totalPages && totalPages > 0) {
      this.search.page = totalPages;
    }
  }
}
