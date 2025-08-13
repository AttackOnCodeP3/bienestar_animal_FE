import {Component, inject} from '@angular/core';
import {Constants} from '@common/constants/constants';
import {
  MAT_DIALOG_DATA,
  MatDialogContent,
} from '@angular/material/dialog';
import {TranslatePipe} from '@ngx-translate/core';
import {MatProgressSpinner} from '@angular/material/progress-spinner';
import {ILoadingModalDialogData} from '@common/interfaces/modals';
import {I18nService} from '@services/general';

/**
 * Component for displaying a modal dialog with a loading spinner.
 * @author dgutierrez
 */
@Component({
  selector: 'app-modal-loading-component',
  imports: [
    MatDialogContent,
    TranslatePipe,
    MatProgressSpinner
  ],
  templateUrl: './modal-loading.component.html',
  styleUrl: './modal-loading.component.scss',
  changeDetection: Constants.changeDetectionStrategy
})
export class ModalLoadingComponent {
  readonly data = inject<ILoadingModalDialogData>(MAT_DIALOG_DATA);
  readonly i18nService = inject(I18nService);

  get loadingMessage(): string {
    return this.data?.i18nMessageKey ?? this.i18nService.i18nLoadingMessagesEnum.LOADING;
  }
}
