/**
 * Age Data Transfer Object
 * This DTO is used to represent the age of an entity in years, months, and days.
 * @author dgutierrez
 */
export class AgeDto {
  years: number | null;
  months: number | null;
  days: number | null;

  constructor(values: Partial<AgeDto>) {
    this.years = values.years ??= null;
    this.months = values.months ??= null;
    this.days = values.days ??= null;
  }
}
