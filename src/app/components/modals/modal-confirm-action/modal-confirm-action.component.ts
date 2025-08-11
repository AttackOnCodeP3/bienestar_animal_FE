import {Component, inject, model} from '@angular/core';
import {Constants} from '@common/constants/constants';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
import {MatButton} from '@angular/material/button';
import {IConfirmActionModalData, IConfirmationResult} from '@common/interfaces/modals';
import {I18nService} from '@services/general';
import {TranslatePipe} from '@ngx-translate/core';
import {MatIcon} from '@angular/material/icon';

/**
 * Component for confirming actions in modals.
 * @author dgutierrez
 */
@Component({
  selector: 'app-modal-confirm-action-component',
  imports: [MatDialogActions, MatDialogContent, MatDialogTitle, MatButton, TranslatePipe, MatIcon],
  templateUrl: './modal-confirm-action.component.html',
  styleUrl: './modal-confirm-action.component.scss',
  changeDetection: Constants.changeDetectionStrategy
})
export class ModalConfirmActionComponent {
  readonly dialogRef = inject<MatDialogRef<ModalConfirmActionComponent, IConfirmationResult>>(MatDialogRef);
  readonly data = inject<IConfirmActionModalData>(MAT_DIALOG_DATA);
  readonly i18nService = inject(I18nService);
  readonly title = model<string>(this.data.title ?? "Estás seguro?");
  readonly message = model<string>(this.data.message ?? "Esta acción no se puede deshacer.");
  readonly confirmButtonText = model<string>(this.data.confirmButtonText ?? this.i18nService.i18nButtonsEnum.BUTTON_CONFIRM);
  readonly cancelButtonText = model<string>(this.data.cancelButtonText ?? this.i18nService.i18nButtonsEnum.BUTTON_CANCEL);
  readonly showCancelButton = model<boolean>(this.data.showCancelButton ?? true);
  readonly matIconName = model<string>(this.data.matIconName ?? 'warning');

  onCancel(){
    this.dialogRef.close({isConfirmed: false});
  }

  onConfirm(){
    this.dialogRef.close({isConfirmed: true});
  }
}
