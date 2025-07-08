import {inject, Injectable} from '@angular/core';
import {firstValueFrom} from 'rxjs';
import {MatPaginatorIntl} from '@angular/material/paginator';
import {TranslateService} from '@ngx-translate/core';
import {I18nService} from '@services/general';

/**
 * Custom internationalization service for Angular Material Paginator.
 * Translates all labels asynchronously using ngx-translate.
 *
 * This service listens for language changes and updates the paginator labels accordingly.
 *
 * @author
 * dgutierrez
 */
@Injectable()
export class MatPaginatorCustomService extends MatPaginatorIntl {
  private readonly translate = inject(TranslateService);
  private readonly i18nService = inject(I18nService);

  constructor() {
    super();
    this.translateLabels();

    this.translate.onLangChange.subscribe(() => {
      this.translateLabels();
    });
  }

  /**
   * Translates paginator labels asynchronously using TranslateService.get().
   * Updates the labels and notifies Angular Material of the changes.
   */
  private async translateLabels(): Promise<void> {
    const keys = this.i18nService.i18nMatEnum;

    const [
      itemsPerPageLabel,
      firstPageLabel,
      lastPageLabel,
      nextPageLabel,
      previousPageLabel
    ] = await Promise.all([
      firstValueFrom( this.translate.get(keys.ITEMS_PER_PAGE_LABEL)),
      firstValueFrom( this.translate.get(keys.FIRST_PAGE_LABEL)),
      firstValueFrom( this.translate.get(keys.LAST_PAGE_LABEL)),
      firstValueFrom( this.translate.get(keys.NEXT_PAGE_LABEL)),
      firstValueFrom( this.translate.get(keys.PREVIOUS_PAGE_LABEL))
    ]);

    this.itemsPerPageLabel = itemsPerPageLabel;
    this.firstPageLabel = firstPageLabel;
    this.lastPageLabel = lastPageLabel;
    this.nextPageLabel = nextPageLabel;
    this.previousPageLabel = previousPageLabel;

    this.changes.next();
  }

  /**
   * Returns the range label for the paginator.
   * This function is also translated asynchronously.
   *
   * @param page Current page index (zero-based)
   * @param pageSize Number of items per page
   * @param length Total number of items
   * @returns A string indicating the range of items on the current page
   */
  override getRangeLabel = (page: number, pageSize: number, length: number): string => {
    const keys = this.i18nService.i18nMatEnum;
    const ofLabel = this.translate.instant(keys.OF);

    if (length === 0 || pageSize === 0) {
      return `0 ${ofLabel} ${length}`;
    }

    const start = page * pageSize;
    const end = Math.min(start + pageSize, length);
    return `${start + 1} - ${end} ${ofLabel} ${length}`;
  };
}
