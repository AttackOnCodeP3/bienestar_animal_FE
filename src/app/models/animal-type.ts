/**
 * AnimalType model
 * This model represents the type of animal, including its ID, name, and description.
 * @author dgutierrez
 */
export class AnimalType {
  id: number | null;
  name: string | null;
  description: string | null;

  constructor(values: Partial<AnimalType> = {}) {
    this.id = values.id ??= null;
    this.name = values.name ??= null;
    this.description = values.description ??= null;
  }
}
