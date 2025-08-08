import {Component, computed, inject, OnInit} from '@angular/core';
import {Constants} from '@common/constants/constants';
import {GeneralContainerComponent} from '@components/layout';
import {ActivatedRoute, Router} from '@angular/router';
import {AlertService, FormsService, I18nService, LogService, ValidationsService} from '@services/general';
import {FileUtilsService} from '@services/utils';
import {LoadingModalService, ModalService} from '@services/modals';
import {ComplaintFormService} from '@services/forms';
import {AuthHttpService, ComplaintHttpService} from '@services/http';
import {PagesUrlsEnum, RouteParamsEnum} from '@common/enums';
import {MatChip} from '@angular/material/chips';

/**
 * Page for managing complaints.
 * @author dgutierrez
 */
@Component({
  selector: 'app-complaint-manage-page',
  imports: [
    GeneralContainerComponent,
    MatChip
  ],
  templateUrl: './complaint-manage.page.html',
  styleUrl: './complaint-manage.page.scss',
  changeDetection: Constants.changeDetectionStrategy
})
export class ComplaintManagePage implements OnInit {
  private readonly authHttpService = inject(AuthHttpService);
  private readonly complaintFormService = inject(ComplaintFormService);
  private readonly complaintHttpService = inject(ComplaintHttpService);
  private readonly loadingModalService = inject(LoadingModalService);
  private readonly logService = inject(LogService);
  private readonly router = inject(Router);
  private readonly validationsService = inject(ValidationsService);
  readonly alertService = inject(AlertService);
  readonly fileUtilsService = inject(FileUtilsService);
  readonly formsService = inject(FormsService);
  readonly i18nService = inject(I18nService);
  readonly modalService = inject(ModalService);
  readonly route = inject(ActivatedRoute);

  readonly complaintToManage = computed(() => this.complaintHttpService.selectedComplaint());

  ngOnInit() {
    this.initializePropertiesAsync();
  }

  /**
   * Initializes properties and fetches the complaint to manage.
   * This method is called on component initialization.
   * @author dgutierrez
   */
  private initializePropertiesAsync() {
    this.initializeComplaintToManage();
  }

  /**
   * Initializes the complaint to manage by fetching it based on the ID from the route parameters.
   * Validates the complaint ID and fetches the complaint details accordingly.
   * @author dgutierrez
   */
  private initializeComplaintToManage() {
    const complaintId = Number(this.route.snapshot.paramMap.get(RouteParamsEnum.COMPLAINT_ID));

    if (!this.validateComplaintId(complaintId)) {
      return;
    }

    this.getComplaint(complaintId);
  }

  /**
   * Fetches the complaint by ID based on the user's role.
   * If the user is a community user, it fetches the complaint for community users.
   * If the user is a municipality admin, it fetches the complaint for municipality admins.
   * @param id The ID of the complaint to fetch.
   * @author dgutierrez
   */
  private getComplaint(id: number) {
    if (this.authHttpService.isCommunityUser()) {
      this.complaintHttpService.getComplaintByIdForCommunityUser(id, {
        ...this.loadingModalService.httpHandlersLoading
      });
    } else if (this.authHttpService.isMunicipalityAdmin()) {
      this.complaintHttpService.getComplaintByIdForMunicipalityAdmin(id, {
        ...this.loadingModalService.httpHandlersLoading
      });
    } else {
      this.logService.error({
        message: 'Unauthorized access to complaints list',
        data: this.authHttpService.currentUser(),
        error: new Error('Unauthorized access')
      })
    }
  }

  /**
   * Validates the complaint ID.
   * If the ID is invalid, navigates to the complaints list page.
   * @param complaintId The complaint ID to validate.
   * @returns True if the ID is valid, false otherwise.
   * @author dgutierrez
   */
  private validateComplaintId(complaintId: number | null): boolean {
    if (!this.validationsService.isDefined(complaintId) || isNaN(complaintId) || complaintId <= 0) {
      this.navigateToComplaintList();
      return false;
    }
    return true;
  }

  /**
   * @author dgutierrez
   */
  navigateToComplaintList() {
    this.router.navigate([PagesUrlsEnum.COMPLAINTS_LIST]);
  }
}
