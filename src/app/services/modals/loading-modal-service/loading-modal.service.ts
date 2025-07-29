import { Injectable, inject } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatDialogState } from '@angular/material/dialog';

import { ModalLoadingComponent } from '@components/modals';
import { ModalDialogPanelClassEnum } from '@common/enums';
import { ILoadingModalDialogData } from '@common/interfaces/modals';
import {I18nService} from '@services/general';

/**
 * Service to manage the display of a loading modal dialog.
 * Ensures only one loading modal is shown at any time.
 * @author dgutierrez
 */
@Injectable({ providedIn: 'root' })
export class LoadingModalService {
  private readonly dialog = inject(MatDialog);
  private readonly i18nService = inject(I18nService);

  private loadingRef: MatDialogRef<ModalLoadingComponent> | null = null;

  /**
   * Shows a loading modal with an optional i18n key for a custom message.
   * If no key is provided, a default loading message is shown.
   * @param i18nMessageKey Optional translation key for the loading message.
   * @author dgutierrez
   */
  async show(i18nMessageKey?: string): Promise<void> {
    if (this.loadingRef?.getState() === MatDialogState.OPEN) {
      this.hide();
    }

    const defaultKey = this.i18nService.i18nLoadingMessagesEnum.LOADING;
    const dialogData: ILoadingModalDialogData = {
      i18nMessageKey: i18nMessageKey ?? defaultKey,
    };

    this.loadingRef = this.dialog.open(ModalLoadingComponent, {
      disableClose: true,
      panelClass: ModalDialogPanelClassEnum.MODAL_DIALOG_PANEL_CLASS_MD,
      data: dialogData,
    });
  }

  /**
   * Hides the loading modal if it is currently open.
   * @author dgutierrez
   */
  hide(): void {
    if (this.loadingRef?.getState() === MatDialogState.OPEN) {
      this.loadingRef.close();
      this.loadingRef = null;
    }
  }
}
