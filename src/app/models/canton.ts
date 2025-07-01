/**
 * Canton model representing a subarea geographically
 * @author dgutierrez
 */
export class Canton {
  id: number | null;
  name: string | null;

  constructor(values: Partial<Canton> = {}) {
    this.id = values.id || null;
    this.name = values.name || null;
  }
}
