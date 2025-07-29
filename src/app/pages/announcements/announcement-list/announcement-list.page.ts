import {Component, computed, inject, OnInit} from '@angular/core';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {MatError, MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {MatOption, MatSelect} from '@angular/material/select';
import {Constants} from '@common/constants/constants';
import {GeneralContainerComponent} from '@components/layout';
import {AnnouncementStateHttpService, AnnouncementHttpService} from '@services/http';
import {AlertService, FormsService, I18nService, TableService} from '@services/general';
import {ReactiveFormsModule, Validators} from '@angular/forms';
import {DatePipe, JsonPipe} from '@angular/common';
import {ISearchAnnouncement} from '@common/interfaces/http';
import {
  MatCell,
  MatCellDef, MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef, MatNoDataRow,
  MatRow,
  MatRowDef, MatTable
} from '@angular/material/table';
import {TranslatePipe} from '@ngx-translate/core';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {
  AnnouncementManagementDisplayedColumnsTableEnum
} from '@common/enums/tables/announcement-management-displayed-columns-table.enum';
import {Router} from '@angular/router';
import {PagesUrlsEnum} from '@common/enums';
import {MatChip} from '@angular/material/chips';

/**
 * Component for displaying a list of announcements with search functionality.
 * It allows users to filter announcements by name and state.
 * @author dgutierrez
 */
@Component({
  selector: 'app-announcement-list-page',
  imports: [
    GeneralContainerComponent,
    MatButton,
    MatFormField,
    MatIcon,
    MatInput,
    MatLabel,
    MatOption,
    MatSelect,
    ReactiveFormsModule,
    MatError,
    MatCell,
    MatCellDef,
    MatHeaderCell,
    MatHeaderRow,
    MatHeaderRowDef,
    MatIconButton,
    MatPaginator,
    MatRow,
    MatRowDef,
    MatTable,
    TranslatePipe,
    MatColumnDef,
    MatHeaderCellDef,
    MatNoDataRow,
    DatePipe,
    MatChip,
  ],
  templateUrl: './announcement-list.page.html',
  styleUrl: './announcement-list.page.scss',
  changeDetection: Constants.changeDetectionStrategy
})
export class AnnouncementListPage implements OnInit {
  readonly alertService = inject(AlertService);
  readonly announcementHttpService = inject(AnnouncementHttpService);
  readonly announcementStateHttpService = inject(AnnouncementStateHttpService);
  readonly formsService = inject(FormsService);
  readonly i18nService = inject(I18nService);
  readonly tableService = inject(TableService);
  readonly router = inject(Router);

  readonly searchForm = this.buildSearchForm();
  readonly displayedColumns = [...Object.values(AnnouncementManagementDisplayedColumnsTableEnum)];
  readonly dataSource = computed(() => this.announcementHttpService.announcementList())

  ngOnInit() {
    this.announcementStateHttpService.getAll();
  }


  get searchFormFilters() {
    const {announcementTitle, announcementState} = this.searchForm.getRawValue();

    const filters: ISearchAnnouncement = {};

    if (announcementTitle) {
      filters.title = announcementTitle;
    }

    if (announcementState !== this.formsService.filterOptionEnum.ALL && announcementState !== null && announcementState !== undefined) {
      filters.stateId = announcementState;
    }

    return filters;
  }

  /**
   * Searches for announcements based on the current search form filters.
   * It retrieves announcements from the user's municipality using the provided filters.
   * @author dgutierrez
   */
  searchAnnouncements() {
    if (this.searchForm.invalid) {
      this.alertService.displayAlert({
        messageKey: this.i18nService.i18nPagesValidationsEnum.GENERAL_INVALID_FIELDS
      })
      return;
    }
    this.announcementHttpService.getAllAnnouncementsByMunicipality(this.searchFormFilters);
  }

  /**
   * Builds the search form for filtering announcements.
   * @author dgutierrez
   */
  buildSearchForm() {
    return this.formsService.formsBuilder.group({
      announcementTitle: this.formsService.formsBuilder.control<string>(""),
      announcementState: this.formsService.formsBuilder.control<number>(this.formsService.filterOptionEnum.ALL, [Validators.required])
    })
  }

  /**
   * Handles pagination changes for the user list.
   * @param event The pagination event containing the new page index and size.
   * @author dgutierrez
   */
  onPageChange(event: PageEvent) {
    this.tableService.onPageChangeGeneric(
      event,
      this.announcementHttpService.search,
      () => this.searchAnnouncements(),
    );
  }

  /**
   * @param id Announcement ID to navigate to the edit page.
   * @author dgutierrez
   */
  navigateToEditAnnouncement(id: number) {
    this.router.navigate([PagesUrlsEnum.ANNOUNCEMENTS_EDIT, id]);
  }

  /**
   * @author dgutierrez
   */
  resetSearchForm() {
    this.searchForm.reset();
  }
}
