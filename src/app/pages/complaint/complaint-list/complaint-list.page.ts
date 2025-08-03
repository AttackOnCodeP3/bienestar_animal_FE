import {Component, OnInit} from '@angular/core';
import {Constants} from '@common/constants/constants';

/**
 * @author dgutierrez
 */
@Component({
  selector: 'app-complaint-list-page',
  imports: [],
  templateUrl: './complaint-list.page.html',
  styleUrl: './complaint-list.page.scss',
  changeDetection: Constants.changeDetectionStrategy
})
export class ComplaintListPage implements OnInit {
  ngOnInit() {
  }
}
