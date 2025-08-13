/**
 * Observations Data Transfer Object
 * This DTO is used to transfer observation data within the application.
 * @author dgutierrez
 */
export class ObservationsDto {
  observations: string | null;

  constructor(values: Partial<ObservationsDto> = {}) {
    this.observations = values.observations ??= null;
  }
}
