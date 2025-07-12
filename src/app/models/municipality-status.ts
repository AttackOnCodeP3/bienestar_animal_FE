/**
 * MunicipalityStatus model representing the status of a municipality.
 * @author dgutierrez
 */
export class MunicipalityStatus {
  id: number | null;
  name: string | null;
  description: string | null;

  constructor(values: Partial<MunicipalityStatus> = {}) {
    this.id = values.id ??= null;
    this.name = values.name ??= null;
    this.description = values.description ??= null;
  }
}
