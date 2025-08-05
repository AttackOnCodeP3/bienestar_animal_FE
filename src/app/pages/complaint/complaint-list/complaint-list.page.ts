import {Component, computed, inject, OnInit} from '@angular/core';
import {Constants} from '@common/constants/constants';
import {AlertService, FormsService, I18nService, LogService, TableService, ValidationsService} from '@services/general';
import {
  AuthHttpService,
  ComplaintHttpService,
  ComplaintStateHttpService,
  ComplaintTypeHttpService
} from '@services/http';
import {Router} from '@angular/router';
import {LoadingModalService, ModalService} from '@services/modals';
import {ComplaintManagementDisplayedColumnsTableEnum} from 'common/enums/tables';
import {GeneralContainerComponent} from '@components/layout';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {PagesUrlsEnum} from '@common/enums';
import {DatePipe} from '@angular/common';
import {
  MatCell,
  MatCellDef, MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef, MatNoDataRow,
  MatRow,
  MatRowDef, MatTable
} from '@angular/material/table';
import {MatChip} from '@angular/material/chips';
import {MatError, MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {ReactiveFormsModule, Validators} from '@angular/forms';
import {StripHtmlPipe} from '@core/pipes';
import {TranslatePipe} from '@ngx-translate/core';
import {MatOption, MatSelect} from '@angular/material/select';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {IHttpActionConfig, ISearchComplaint} from '@common/interfaces/http';

/**
 * @author dgutierrez
 */
@Component({
  selector: 'app-complaint-list-page',
  imports: [
    GeneralContainerComponent,
    MatButton,
    MatIcon,
    DatePipe,
    MatCell,
    MatCellDef,
    MatChip,
    MatError,
    MatFormField,
    MatHeaderCell,
    MatHeaderRow,
    MatHeaderRowDef,
    MatIconButton,
    MatInput,
    MatLabel,
    MatOption,
    MatPaginator,
    MatRow,
    MatRowDef,
    MatSelect,
    MatTable,
    ReactiveFormsModule,
    StripHtmlPipe,
    TranslatePipe,
    MatColumnDef,
    MatHeaderCellDef,
    MatNoDataRow
  ],
  templateUrl: './complaint-list.page.html',
  styleUrl: './complaint-list.page.scss',
  changeDetection: Constants.changeDetectionStrategy
})
export class ComplaintListPage implements OnInit {

  readonly alertService = inject(AlertService);
  readonly complaintHttpService = inject(ComplaintHttpService);
  readonly complaintTypeHttpService = inject(ComplaintTypeHttpService);
  readonly complaintStateHttpService = inject(ComplaintStateHttpService)
  readonly formsService = inject(FormsService);
  readonly i18nService = inject(I18nService);
  readonly tableService = inject(TableService);
  readonly authHttpService = inject(AuthHttpService);
  readonly router = inject(Router);
  readonly modalService = inject(ModalService);
  readonly logService = inject(LogService);
  readonly validationsService = inject(ValidationsService);
  readonly loadingModalService = inject(LoadingModalService)

  readonly displayedColumns = [...Object.values(ComplaintManagementDisplayedColumnsTableEnum)];
  readonly searchForm = this.buildSearchForm();
  readonly dataSource = computed(() => this.complaintHttpService.complaintList());

  get searchFormFilters() {
    const {complaintTypeId, complaintStateId} = this.searchForm.getRawValue();

    const filters: ISearchComplaint = {};

    if (complaintTypeId !== this.formsService.filterOptionEnum.ALL && this.validationsService.isDefined(complaintTypeId)) {
      filters.typeId = complaintTypeId;
    }

    if (complaintStateId !== this.formsService.filterOptionEnum.ALL && this.validationsService.isDefined(complaintStateId)) {
      filters.stateId = complaintStateId;
    }

    return filters;
  }

  ngOnInit() {
    this.initializeAsyncData();
  }

  /**
   * Initializes the component necessary data.
   * @author dgutierrez
   */
  private initializeAsyncData(): void {
    this.fetchComplaints();
    this.complaintTypeHttpService.getAll();
    this.complaintStateHttpService.getAll();
  }

  /**
   * Searches for complaints based on the current search form filters.
   * It retrieves complaints based on the user's role:
   * - Community users will fetch their own complaints.
   * - Municipality admins will fetch complaints for their municipality.
   * If the form is invalid, an alert is displayed and the search is not performed.
   * @author dgutierrez
   */
  searchComplaints() {
    if (this.searchForm.invalid) {
      this.alertService.displayAlert({
        messageKey: this.i18nService.i18nPagesValidationsEnum.GENERAL_INVALID_FIELDS
      })
      return;
    }

    this.fetchComplaints();
  }

  /**
   * Fetches the list of complaints based on the user's role.
   * - Community users will fetch their own complaints.
   * - Municipality admins will fetch complaints for their municipality.
   * - Unauthorized access will log an error.
   * @author dgutierrez
   */
  private fetchComplaints(): void {
    if (this.authHttpService.isCommunityUser()) {
      this.complaintHttpService.getMyComplaintsAsCommunityUser({
        filters: this.searchFormFilters,
        handlers: this.loadingModalService.httpHandlersLoading
      });
    } else if (this.authHttpService.isMunicipalityAdmin()) {
      this.complaintHttpService.getComplaintsOfAuthenticatedMunicipalityAdmin({
        filters: this.searchFormFilters,
        handlers: this.loadingModalService.httpHandlersLoading
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
   * Builds the search form for filtering complaints.
   * @author dgutierrez
   */
  private buildSearchForm() {
    const formsBuilder = this.formsService.formsBuilder;
    return formsBuilder.group({
      complaintTypeId: formsBuilder.control<number | null>(this.formsService.filterOptionEnum.ALL, [Validators.required]),
      complaintStateId: formsBuilder.control<number | null>(this.formsService.filterOptionEnum.ALL, [Validators.required])
    })
  }

  navigateComplaintManage(complaintId: number) {
    this.router.navigate([PagesUrlsEnum.COMPLAINT_MANAGE, complaintId]);
  }

  /**
   * Opens a modal to view the image associated with the announcement.
   * @param imageUrl
   * @author dgutierrez
   */
  onViewImage(imageUrl: string) {
    this.modalService.openPictureViewerModal({
      imageSource: imageUrl
    });
  }

  /**
   * Handles pagination changes for the user list.
   * @param event The pagination event containing the new page index and size.
   * @author dgutierrez
   */
  onPageChange(event: PageEvent) {
    this.tableService.onPageChangeGeneric(
      event,
      this.complaintHttpService.search,
      () => this.searchComplaints(),
    );
  }

  /**
   * Handles pagination changes for the complaint list.
   * @author dgutierrez
   */
  resetSearchForm() {
    this.searchForm.reset();
  }

  /** Handles pagination changes for the complaint list.
   * @author dgutierrez
   */
  navigateToCreateComplaint() {
    this.router.navigate([PagesUrlsEnum.COMPLAINTS_CREATE])
  }
}
