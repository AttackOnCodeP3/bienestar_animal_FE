import {Component, inject} from '@angular/core';

import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle
} from '@angular/material/dialog';
import {MatButton} from '@angular/material/button';

import {TranslatePipe} from '@ngx-translate/core';

import {Constants} from '@common/constants/constants';
import {I18nService} from '@services/general';
import {IViewerPictureModalDialogData} from '@common/interfaces/modals';

/**
 * Component for displaying a modal dialog to view pictures.
 * @author dgutierrez
 */
@Component({
  selector: 'app-modal-viewer-picture-viewer-component',
  imports: [
    MatButton,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle,
    TranslatePipe
  ],
  templateUrl: './modal-viewer-picture-viewer.component.html',
  styleUrl: './modal-viewer-picture-viewer.component.scss',
  changeDetection: Constants.changeDetectionStrategy
})
export class ModalViewerPictureViewerComponent {
  readonly data = inject<IViewerPictureModalDialogData>(MAT_DIALOG_DATA);
  readonly i18nService = inject(I18nService);
}
