import {Component, inject, OnInit} from '@angular/core';
import {Constants} from '@common/constants/constants';
import {ComplaintTypeHttpService} from '@services/http';
import {JsonPipe} from '@angular/common';
import {GeneralContainerComponent} from '@components/layout';
import {ComplaintFormComponent} from '@components/complaint';
import {FormsService} from '@services/general';
import {Validators} from '@angular/forms';

/**
 * Page for creating a new complaint.
 * @author dgutierrez
 */
@Component({
  selector: 'app-complaint-create-page',
  imports: [
    GeneralContainerComponent,
    ComplaintFormComponent
  ],
  templateUrl: './complaint-create.page.html',
  styleUrl: './complaint-create.page.scss',
  changeDetection: Constants.changeDetectionStrategy
})
export class ComplaintCreatePage implements OnInit {

  readonly complaintTypeHttpService = inject(ComplaintTypeHttpService)
  readonly formsService = inject(FormsService);

  readonly complaintCreateForm = this.buildCreateComplaintForm();

  ngOnInit() {
    this.complaintTypeHttpService.getAll();
  }

  private buildCreateComplaintForm() {
    const formsBuilder = this.formsService.formsBuilder;
    return formsBuilder.group({
      complaintTypeId:  formsBuilder.control(null, Validators.required),
      description: formsBuilder.control('', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(1000)
      ]),
    })
  }
}
