import { Pipe, PipeTransform } from '@angular/core';

/**
 * Pipe to strip HTML tags from a string.
 * @author dgutierrez
 */
@Pipe({
  name: 'stripHtml',
})
export class StripHtmlPipe implements PipeTransform {
  transform(value: string | null | undefined): string {
    if (!value) return '';
    return value.replace(/<[^>]*>/g, '');
  }
}
