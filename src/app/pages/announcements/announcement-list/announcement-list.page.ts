import {Component, inject, OnInit} from '@angular/core';
import {Constants} from '@common/constants/constants';
import {GeneralContainerComponent} from '@components/layout';
import {MatButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {MatOption, MatSelect} from '@angular/material/select';
import {AnnouncementStateHttpService} from '@services/http';

@Component({
  selector: 'app-announcement-list-page',
  imports: [
    GeneralContainerComponent,
    MatButton,
    MatIcon,
    MatFormField,
    MatLabel,
    MatSelect,
    MatOption,
    MatInput
  ],
  templateUrl: './announcement-list.page.html',
  styleUrl: './announcement-list.page.scss',
  changeDetection: Constants.changeDetectionStrategy
})
export class AnnouncementListPage implements OnInit {
  readonly announcementStateHttpService = inject(AnnouncementStateHttpService)

  ngOnInit() {
    this.announcementStateHttpService.getAll();
  }
}
