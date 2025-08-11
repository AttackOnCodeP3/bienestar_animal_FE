/**
 * ComplaintStateDTO represents the data transfer object for complaint states.
 * @author dgutierrez
 */
export class ComplaintTypeDTO {
  id: number | null;
  name: string | null;
  description: string | null;

  constructor(values: Partial<ComplaintTypeDTO> = {}) {
    this.id = values.id ??= null;
    this.name = values.name ??= null;
    this.description = values.description ??= null;
  }
}
