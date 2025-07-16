import {Species} from './species';

/**
 * Model representing a vaccine for animals.
 * @author dgutierrez
 */
export class Vaccine {
  id: number | null;
  name: string;
  description: string | null;
  species: Species[];

  constructor(values: Partial<Vaccine> = {}) {
    this.id = values.id ??= null;
    this.name = values.name ??= '';
    this.description = values.description ??= null;
    this.species = values.species ??= [];
  }
}
