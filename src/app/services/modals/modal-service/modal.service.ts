import {inject, Injectable} from '@angular/core';
import {INotificationsModalDialogData, IViewerPictureModalDialogData} from '@common/interfaces/modals';
import {MatDialog} from '@angular/material/dialog';
import {ModalViewerPictureViewerComponent, ModalNotificationsComponent} from '@components/modals';
import {ModalDialogPanelClassEnum} from '@common/enums';

/**
 * Service for managing modal dialogs in the application.
 * @author dgutierrez
 */
@Injectable({
  providedIn: 'root'
})
export class ModalService {

  readonly dialog = inject(MatDialog);

  /**
   * Opens the notifications modal dialog with the provided properties.
   * @param modalPropsDialogData Properties to configure the notifications modal dialog.
   * @author dgutierrez
   */
  openNotificationsModal(modalPropsDialogData: INotificationsModalDialogData = {}): void {
    this.dialog.open(ModalNotificationsComponent, {
      panelClass: ModalDialogPanelClassEnum.MODAL_DIALOG_PANEL_CLASS_MD,
      disableClose: true,
      data: modalPropsDialogData
    });
  }

  /**
   * Opens the picture viewer modal dialog with the provided properties.
   * @param modalPropsDialogData Properties to configure the picture viewer modal dialog.
   * @author dgutierrez
   */
  openPictureViewerModal(modalPropsDialogData: IViewerPictureModalDialogData): void {
    this.dialog.open(ModalViewerPictureViewerComponent, {
      panelClass: ModalDialogPanelClassEnum.MODAL_DIALOG_PANEL_CLASS_MD,
      disableClose: true,
      data: modalPropsDialogData
    });
  }
}
