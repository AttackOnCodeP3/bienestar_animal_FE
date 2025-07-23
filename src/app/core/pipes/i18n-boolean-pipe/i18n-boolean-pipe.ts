import {inject, Pipe, PipeTransform} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {Observable, startWith, switchMap} from 'rxjs';
import {I18nService} from '@services/general';

@Pipe({
  name: 'i18nBoolean'
})
export class I18nBooleanPipe implements PipeTransform {
  private readonly translate = inject(TranslateService);
  private readonly i18nService = inject(I18nService);

  transform(value: unknown): Observable<string> {
    if (value === null || value === undefined) {
      return new Observable((observer) => observer.next(''));
    }

    const key = value
      ? this.i18nService.i18nCommonEnum.TRUE_LABEL
      : this.i18nService.i18nCommonEnum.FALSE_LABEL;

    return this.translate.onLangChange.pipe(
      startWith(null),
      switchMap(() => this.translate.get(key))
    );
  }
}
