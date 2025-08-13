/**
 * ComplaintType model
 * @author dgutierrez
 */
export class ComplaintType {
  id: number | null;
  name: string | null;
  description: string | null;

  constructor(values: Partial<ComplaintType> = {}) {
    this.id = values.id || null;
    this.name = values.name || null;
    this.description = values.description || null;
  }
}
