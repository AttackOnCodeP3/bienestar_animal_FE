import {Component, inject, OnInit} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions, MatDialogClose,
  MatDialogContent,
  MatDialogTitle
} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatProgressSpinner} from '@angular/material/progress-spinner';
import {DatePipe} from '@angular/common';
import {MatIcon} from '@angular/material/icon';
import {InfiniteScrollDirective} from 'ngx-infinite-scroll';

import {AnimationOptions, LottieComponent} from 'ngx-lottie';

import {Constants} from '@common/constants/constants';
import {INotificationsModalDialogData} from '@common/interfaces/modals';
import {NotificationHttpService} from '@services/http';
import {I18nService} from '@services/general';
import {TranslatePipe} from '@ngx-translate/core';
import {LottieAnimationsPathsEnum} from '@common/enums';
import {MatCard, MatCardContent} from '@angular/material/card';
import {MatChip} from '@angular/material/chips';
import {TimeAgoPipe} from '@core/pipes';

/**
 * Component for displaying a modal dialog with user notifications.
 * It fetches notifications from the server and displays them in a scrollable list.
 * The component supports infinite scrolling to load more notifications as the user scrolls down.
 * @author dgutierrez
 */
@Component({
  selector: 'app-notifications-modal-component',
  imports: [
    FormsModule,
    InfiniteScrollDirective,
    LottieComponent,
    MatButtonModule,
    MatCard,
    MatCardContent,
    MatChip,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle,
    MatFormFieldModule,
    MatIcon,
    MatInputModule,
    MatProgressSpinner,
    TimeAgoPipe,
    TranslatePipe,
  ],
  templateUrl: './modal-notifications.component.html',
  styleUrl: './modal-notifications.component.scss',
  changeDetection: Constants.changeDetectionStrategy
})
export class ModalNotificationsComponent implements OnInit {

  readonly notificationHttpService = inject(NotificationHttpService)
  readonly data = inject<INotificationsModalDialogData>(MAT_DIALOG_DATA);
  readonly i18nService = inject(I18nService)

  readonly animationOptions: AnimationOptions = {
    path: LottieAnimationsPathsEnum.NO_NOTIFICATIONS_AVAILABLE,
  };

  readonly throttle = 300;
  readonly scrollDistance = 1;

  ngOnInit() {
    this.notificationHttpService.getMyNotifications();
  }

  /**
   * @author dgutierrez
   */
  onLoadNextPageNotifications(): void {
    this.notificationHttpService.getMyNotifications({
      nextPage: true
    });
  }
}
