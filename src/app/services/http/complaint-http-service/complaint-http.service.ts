import {computed, Injectable, signal} from '@angular/core';
import {BaseHttpService} from '@services/http/base-http-service/base-http.service';
import {Constants} from '@common/constants/constants';
import {ComplaintDto, CreateComplaintMultipartDto, ObservationsDto, UpdateComplaintMultipartDto} from '@models/dto';
import {IHttpActionConfig, IResponse, ISearch, ISearchComplaint} from '@common/interfaces/http';
import {finalize} from 'rxjs';
import {AlertTypeEnum} from '@common/enums';

@Injectable({providedIn: 'root'})
export class ComplaintHttpService extends BaseHttpService<ComplaintDto> {
  protected override source = Constants.COMPLAINTS_URL;

  readonly complaintList = signal<ComplaintDto[]>([]);
  readonly selectedComplaint = signal<ComplaintDto | null>(null);
  private readonly isLoading = signal<boolean>(false);
  private readonly hasSearched = signal<boolean>(false);

  readonly isComplaintsLoading = computed(() => this.isLoading());
  readonly hasSearchedComplaints = computed(() => this.hasSearched());
  readonly isComplaintsEmpty = computed(() => this.complaintList().length === 0 && !this.isLoading());

  search: ISearch = {page: 1, size: 10};
  totalItems: number[] = [];

  get searchPage(): number {
    return this.search.page ?? 1;
  }

  /* ===================== LISTADOS ===================== */

  /**
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
   * @author dgutierrez
   */
  getComplaintByIdForMunicipalityAdmin(id: number, config?: IHttpActionConfig): void {
    this.isLoading.set(true);
    config?.showLoading?.();

    this.http.get<IResponse<ComplaintDto>>(`${this.sourceUrl}/my-municipality/${id}`)
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
   * @author dgutierrez
   */
  getComplaintByIdForCommunityUser(id: number, config?: IHttpActionConfig): void {
    this.isLoading.set(true);
    config?.showLoading?.();

    this.http.get<IResponse<ComplaintDto>>(`${this.sourceUrl}/my-complaints/${id}`)
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
    const params = {page: this.search.page, size: this.search.size, ...filters};

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
          this.search = {...this.search, ...res.meta};
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
   * @author dgutierrez
   */
  private fetchMunicipalComplaints(filters: ISearchComplaint = {}, config?: IHttpActionConfig): void {
    const params = {page: this.search.page, size: this.search.size, ...filters};

    this.isLoading.set(true);
    config?.showLoading?.();

    this.http.get<IResponse<ComplaintDto[]>>(`${this.sourceUrl}/my-municipality/filter`, {
      params: this.buildUrlParams(params),
    }).pipe(finalize(() => {
      this.isLoading.set(false);
      config?.hideLoading?.();
    }))
      .subscribe({
        next: (res) => {
          this.complaintList.set(res.data);
          this.search = {...this.search, ...res.meta};
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
   * @author dgutierrez
   */
  private updatePagination(totalPages: number): void {
    this.totalItems = Array.from({length: totalPages}, (_, i) => i + 1);
    if (this.searchPage > totalPages && totalPages > 0) this.search.page = totalPages;
  }

  /* ===================== CREAR ===================== */

  /**
   * @param config
   * @author dgutierrez
   */
  createComplaint(config: { dto: CreateComplaintMultipartDto, handlers?: IHttpActionConfig }): void {
    const {dto, handlers} = config;
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
          this.alertService.displayAlert({type: AlertTypeEnum.SUCCESS, message: response.message});
          handlers?.callback?.();
        },
        error: this.handleError({
          message: 'Error creating complaint.',
          context: `${this.constructor.name}#createComplaint`
        }),
      });
  }

  /* ===================== ACCIONES – COMUNITARIO ===================== */

  /** PUT /complaints/{id}  (update + reabrir si estaba WITH_OBSERVATIONS)
   * @author dgutierrez
   */
  updateComplaint(config: {
    id: number,
    dto: UpdateComplaintMultipartDto,
    handlers?: IHttpActionConfig
  }): void {
    const {id, dto, handlers} = config;

    const formData = dto.toFormData();

    this.isLoading.set(true);
    handlers?.showLoading?.();

    this.http.put<IResponse<ComplaintDto>>(`${this.sourceUrl}/${id}`, formData)
      .pipe(finalize(() => {
        this.isLoading.set(false);
        handlers?.hideLoading?.();
      }))
      .subscribe({
        next: (res) => {
          this.selectedComplaint.set(res.data);
          this.alertService.displayAlert({type: AlertTypeEnum.SUCCESS, message: res.message});
          handlers?.callback?.();
        },
        error: this.handleError({
          message: 'Error updating complaint.',
          context: `${this.constructor.name}#updateComplaint`
        }),
      });
  }

  /** PUT /complaints/{id}/cancel
   * @author dgutierrez
   */
  cancelComplaint(config: { id: number, handlers?: IHttpActionConfig }): void {
    const {id, handlers} = config;
    this.isLoading.set(true);
    handlers?.showLoading?.();

    this.http.put<IResponse<ComplaintDto>>(`${this.sourceUrl}/${id}/cancel`, {})
      .pipe(finalize(() => {
        this.isLoading.set(false);
        handlers?.hideLoading?.();
      }))
      .subscribe({
        next: (res) => {
          this.selectedComplaint.set(res.data);
          this.alertService.displayAlert({type: AlertTypeEnum.SUCCESS, message: res.message});
          handlers?.callback?.();
        },
        error: this.handleError({
          message: 'Error cancelling complaint.',
          context: `${this.constructor.name}#cancelComplaint`
        }),
      });
  }

  /** PUT /complaints/{id}/resubmit
   * @author dgutierrez
   */
  resubmitComplaint(config: { id: number, handlers?: IHttpActionConfig }): void {
    const {id, handlers} = config;
    this.isLoading.set(true);
    handlers?.showLoading?.();

    this.http.put<IResponse<ComplaintDto>>(`${this.sourceUrl}/${id}/resubmit`, {})
      .pipe(finalize(() => {
        this.isLoading.set(false);
        handlers?.hideLoading?.();
      }))
      .subscribe({
        next: (res) => {
          this.selectedComplaint.set(res.data);
          this.alertService.displayAlert({type: AlertTypeEnum.SUCCESS, message: res.message});
          handlers?.callback?.();
        },
        error: this.handleError({
          message: 'Error resubmitting complaint.',
          context: `${this.constructor.name}#resubmitComplaint`
        }),
      });
  }

  /* ===================== ACCIONES – ADMIN ===================== */

  /** PUT /complaints/{id}/observe
   * @author dgutierrez
   */
  observeComplaint(config: { id: number, dto: ObservationsDto, handlers?: IHttpActionConfig }): void {
    const {id, dto, handlers} = config;
    this.isLoading.set(true);
    handlers?.showLoading?.();

    this.http.put<IResponse<ComplaintDto>>(`${this.sourceUrl}/${id}/observe`, dto)
      .pipe(finalize(() => {
        this.isLoading.set(false);
        handlers?.hideLoading?.();
      }))
      .subscribe({
        next: (res) => {
          this.selectedComplaint.set(res.data);
          this.alertService.displayAlert({type: AlertTypeEnum.SUCCESS, message: res.message});
          handlers?.callback?.();
        },
        error: this.handleError({
          message: 'Error setting observations.',
          context: `${this.constructor.name}#observeComplaint`
        }),
      });
  }

  /** PUT /complaints/{id}/approve
   * @author dgutierrez
   */
  approveComplaint(config: { id: number, handlers?: IHttpActionConfig }): void {
    const {id, handlers} = config;
    this.isLoading.set(true);
    handlers?.showLoading?.();

    this.http.put<IResponse<ComplaintDto>>(`${this.sourceUrl}/${id}/approve`, {})
      .pipe(finalize(() => {
        this.isLoading.set(false);
        handlers?.hideLoading?.();
      }))
      .subscribe({
        next: (res) => {
          this.selectedComplaint.set(res.data);
          this.alertService.displayAlert({type: AlertTypeEnum.SUCCESS, message: res.message});
          handlers?.callback?.();
        },
        error: this.handleError({
          message: 'Error approving complaint.',
          context: `${this.constructor.name}#approveComplaint`
        }),
      });
  }

  /** PUT /complaints/{id}/complete
   * @author dgutierrez
   */
  completeComplaint(config: { id: number, handlers?: IHttpActionConfig }): void {
    const {id, handlers} = config;
    this.isLoading.set(true);
    handlers?.showLoading?.();

    this.http.put<IResponse<ComplaintDto>>(`${this.sourceUrl}/${id}/complete`, {})
      .pipe(finalize(() => {
        this.isLoading.set(false);
        handlers?.hideLoading?.();
      }))
      .subscribe({
        next: (res) => {
          this.selectedComplaint.set(res.data);
          this.alertService.displayAlert({type: AlertTypeEnum.SUCCESS, message: res.message});
          handlers?.callback?.();
        },
        error: this.handleError({
          message: 'Error completing complaint.',
          context: `${this.constructor.name}#completeComplaint`
        }),
      });
  }

  /** PUT /complaints/{id}/close
   * @author dgutierrez
   */
  closeComplaint(config: { id: number, handlers?: IHttpActionConfig }): void {
    const {id, handlers} = config;
    this.isLoading.set(true);
    handlers?.showLoading?.();

    this.http.put<IResponse<ComplaintDto>>(`${this.sourceUrl}/${id}/close`, {})
      .pipe(finalize(() => {
        this.isLoading.set(false);
        handlers?.hideLoading?.();
      }))
      .subscribe({
        next: (res) => {
          this.selectedComplaint.set(res.data);
          this.alertService.displayAlert({type: AlertTypeEnum.SUCCESS, message: res.message});
          handlers?.callback?.();
        },
        error: this.handleError({
          message: 'Error closing complaint.',
          context: `${this.constructor.name}#closeComplaint`
        }),
      });
  }

  /**
   * Cancels a complaint as MUNICIPAL_ADMIN (forces state to CANCELLED).
   * PUT /complaints/{id}/cancel
   * @author dgutierrez
   */
  cancelComplaintAsAdmin(config: { id: number; handlers?: IHttpActionConfig }): void {
    const {id, handlers} = config;
    this.isLoading.set(true);
    handlers?.showLoading?.();

    this.http.put<IResponse<ComplaintDto>>(`${this.sourceUrl}/${id}/cancel/admin`, {})
      .pipe(finalize(() => {
        this.isLoading.set(false);
        handlers?.hideLoading?.();
      }))
      .subscribe({
        next: (res) => {
          this.selectedComplaint.set(res.data);
          this.alertService.displayAlert({type: AlertTypeEnum.SUCCESS, message: res.message});
          handlers?.callback?.();
        },
        error: this.handleError({
          message: 'Error cancelling complaint as admin.',
          context: `${this.constructor.name}#cancelComplaintAsAdmin`
        }),
      });
  }

  /**
   * Closes a complaint as MUNICIPAL_ADMIN (forces state to COMPLETED).
   * PUT /complaints/{id}/close
   * @author dgutierrez
   */
  closeComplaintAsAdmin(config: { id: number; handlers?: IHttpActionConfig }): void {
    const {id, handlers} = config;
    this.isLoading.set(true);
    handlers?.showLoading?.();

    this.http.put<IResponse<ComplaintDto>>(`${this.sourceUrl}/${id}/close`, {})
      .pipe(finalize(() => {
        this.isLoading.set(false);
        handlers?.hideLoading?.();
      }))
      .subscribe({
        next: (res) => {
          this.selectedComplaint.set(res.data);
          this.alertService.displayAlert({type: AlertTypeEnum.SUCCESS, message: res.message});
          handlers?.callback?.();
        },
        error: this.handleError({
          message: 'Error closing complaint as admin.',
          context: `${this.constructor.name}#closeComplaintAsAdmin`
        }),
      });
  }
}
