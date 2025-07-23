/**
 * Species model representing a biological species.
 * This model includes properties for the species ID, name, and description.
 * @author dgutierrez
 */
export class Species {
  id: number | null;
  name: string | null;
  description: string | null;

  constructor(values: Partial<Species> = {}) {
    this.id = values.id ??= null;
    this.name = values.name ??= null;
    this.description = values.description ??= null;
  }
}
