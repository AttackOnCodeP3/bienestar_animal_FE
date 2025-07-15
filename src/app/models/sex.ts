/**
 * Sex model class representing the biological sex of an animal.
 * @author dgutierrez
 */
export class Sex {
  id: number | null;
  name: string | null;

  constructor(values: Partial<Sex> = {}) {
    this.id = values.id ??= null;
    this.name = values.name ??= null;
  }
}
