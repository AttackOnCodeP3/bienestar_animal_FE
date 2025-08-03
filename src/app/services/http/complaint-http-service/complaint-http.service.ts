import {computed, Injectable, signal} from '@angular/core';
import {BaseHttpService} from '@services/http/base-http-service/base-http.service';
import {Complaint} from '@models';
import {Constants} from '@common/constants/constants';
import {CreateComplaintMultipartDto} from '@models/dto';
import {IHttpActionConfig, IResponse} from '@common/interfaces/http';
import {finalize} from 'rxjs';
import {AlertTypeEnum} from '@common/enums';

/**
 * Service to handle HTTP requests related to complaints.
 * @author dgutierrez
 */
@Injectable({
  providedIn: 'root'
})
export class ComplaintHttpService extends BaseHttpService<Complaint> {
  protected override source = Constants.COMPLAINTS_URL;

  readonly complaintList = signal<Complaint[]>([]);
  readonly selectedComplaint = signal<Complaint | null>(null);
  private readonly isLoading = signal<boolean>(false);

  readonly isComplaintsLoading = computed(() => this.isLoading());

  /**
   * Sends a multipart/form-data request to create a new complaint
   * associated with the currently authenticated user.
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
  createComplaint(
    dto: CreateComplaintMultipartDto,
    config?: IHttpActionConfig
  ): void {
    this.isLoading.set(true);
    config?.showLoading?.();

    const formData = dto.toFormData();

    this.http.post<IResponse<Complaint>>(this.sourceUrl, formData)
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
}
