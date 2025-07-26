import {inject, Injectable} from '@angular/core';
import {INotificationsModalDialogData} from '@common/interfaces/modals';
import {MatDialog} from '@angular/material/dialog';
import {NotificationsModalComponent} from '@components/modals';
import {ModalDialogPanelClassEnum} from '@common/enums';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  readonly dialog = inject(MatDialog);

  /**
   * Opens the notifications modal dialog with the provided properties.
   * @param modalProps Properties to configure the notifications modal dialog.
   * @author dgutierrez
   */
  openNotificationsModal(modalProps: INotificationsModalDialogData = {}): void {
    this.dialog.open(NotificationsModalComponent, {
      panelClass: ModalDialogPanelClassEnum.MODAL_DIALOG_PANEL_CLASS_MD,
      disableClose: true,
      data: { modalProps: modalProps }
    });
  }
}
