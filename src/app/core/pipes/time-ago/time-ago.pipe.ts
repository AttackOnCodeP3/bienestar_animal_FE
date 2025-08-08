import { Pipe, PipeTransform } from '@angular/core';

/**
 * Pipe to format a date as a relative time string in Spanish.
 * It uses the Intl.RelativeTimeFormat API to provide a human-readable format like "hace
 * x minutos", "hace x horas", etc.
 * @author dgutierrez
 */
@Pipe({
  name: 'timeAgo'
})
export class TimeAgoPipe implements PipeTransform {
  private rtf = new Intl.RelativeTimeFormat('es', { numeric: 'auto' });

  transform(input: string | number | Date | null | undefined): string {
    if (!input) return '';
    const date = (input instanceof Date)
      ? input
      : new Date(input);
    if (!date || isNaN(date.getTime())) return '';

    const now = Date.now();
    const diff = date.getTime() - now;
    const seconds = Math.round(diff / 1000);
    const minutes = Math.round(seconds / 60);
    const hours = Math.round(minutes / 60);
    const days = Math.round(hours / 24);
    const weeks = Math.round(days / 7);
    const months = Math.round(days / 30);
    const years = Math.round(days / 365);

    if (Math.abs(seconds) < 60) {
      return this.rtf.format(seconds, 'second');
    }
    if (Math.abs(minutes) < 60) {
      return this.rtf.format(minutes, 'minute');
    }
    if (Math.abs(hours) < 24) {
      return this.rtf.format(hours, 'hour');
    }
    if (Math.abs(days) < 7) {
      return this.rtf.format(days, 'day');
    }
    if (Math.abs(weeks) < 5) {
      return this.rtf.format(weeks, 'week');
    }
    if (Math.abs(months) < 12) {
      return this.rtf.format(months, 'month');
    }
    return this.rtf.format(years, 'year');
  }
}
