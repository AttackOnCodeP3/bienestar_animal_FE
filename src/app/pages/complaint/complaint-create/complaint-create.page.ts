import {Component, inject, OnInit} from '@angular/core';
import {Constants} from '@common/constants/constants';
import {ComplaintTypeHttpService} from '@services/http';
import {JsonPipe} from '@angular/common';
import {GeneralContainerComponent} from '@components/layout';
import {ComplaintFormComponent} from '@components/complaint';

/**
 * Page for creating a new complaint.
 * @author dgutierrez
 */
@Component({
  selector: 'app-complaint-create-page',
  imports: [
    JsonPipe,
    GeneralContainerComponent,
    ComplaintFormComponent
  ],
  templateUrl: './complaint-create.page.html',
  styleUrl: './complaint-create.page.scss',
  changeDetection: Constants.changeDetectionStrategy
})
export class ComplaintCreatePage implements OnInit {

  readonly complaintTypeHttpService = inject(ComplaintTypeHttpService)

  ngOnInit() {
    this.complaintTypeHttpService.getAll();
  }
}
