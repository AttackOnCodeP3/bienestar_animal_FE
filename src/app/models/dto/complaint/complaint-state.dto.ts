/**
 * ComplaintStateDto
 * Represents the state of a complaint in the system.
 * @author dgutierrez
 */
export class ComplaintStateDTO {
  id: number | null;
  name: string | null;

  constructor(values: Partial<ComplaintStateDTO> = {}) {
    this.id = values.id ??= null;
    this.name = values.name ??= null;
  }
}
