import {inject, Injectable, Signal} from '@angular/core';
import {
  IConfirmActionModalData, IConfirmationResult,
  INotificationsModalDialogData,
  IViewerPictureModalDialogData
} from '@common/interfaces/modals';
import {MatDialog} from '@angular/material/dialog';
import {
  ModalViewerPictureViewerComponent,
  ModalNotificationsComponent, ModalConfirmActionComponent,
} from '@components/modals';
import {ModalDialogPanelClassEnum} from '@common/enums';
import {firstValueFrom} from 'rxjs';

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

  /**
   * Opens a confirmation action modal dialog with the provided properties.
   * @param modalProps Properties to configure the confirmation action modal dialog.
   * @returns A signal that resolves with the confirmation result when the modal is closed.
   * @author dgutierrez
   */
  async openConfirmActionModal(modalProps: IConfirmActionModalData = {}): Promise<IConfirmationResult | undefined> {
    const ref = this.dialog.open<
      ModalConfirmActionComponent,
      IConfirmActionModalData,
      IConfirmationResult
    >(ModalConfirmActionComponent, {
      panelClass: ModalDialogPanelClassEnum.MODAL_DIALOG_PANEL_CLASS_MD,
      disableClose: true,
      data: modalProps,
    });

    return firstValueFrom(ref.afterClosed());
  }
}
