import {Component, inject, OnInit} from '@angular/core';
import {MatButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {MatOption, MatSelect} from '@angular/material/select';
import {Constants} from '@common/constants/constants';
import {GeneralContainerComponent} from '@components/layout';
import {AnnouncementStateHttpService} from '@services/http';
import {FormsService} from '@services/general';
import {AnnouncementState} from '@models';
import {ReactiveFormsModule} from '@angular/forms';

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
    ReactiveFormsModule
  ],
  templateUrl: './announcement-list.page.html',
  styleUrl: './announcement-list.page.scss',
  changeDetection: Constants.changeDetectionStrategy
})
export class AnnouncementListPage implements OnInit {
  readonly formsService = inject(FormsService);
  readonly announcementStateHttpService = inject(AnnouncementStateHttpService)

  readonly searchForm = this.buildSearchForm();

  ngOnInit() {
    this.announcementStateHttpService.getAll();
  }

  /**
   * Builds the search form for filtering announcements.
   * @author dgutierrez
   */
  buildSearchForm() {
    return this.formsService.formsBuilder.group({
      announcementName: this.formsService.formsBuilder.control<string>(""),
      announcementState: this.formsService.formsBuilder.control<AnnouncementState | number>(this.formsService.filterOptionEnum.ALL)
    })
  }

  /**
   * @author dgutierrez
   */
  resetSearchForm() {
    this.searchForm.reset();
  }
}
