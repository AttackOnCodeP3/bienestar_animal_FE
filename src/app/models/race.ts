import {Species} from './species';

/**
 * Race model representing a biological race.
 * @author dgutierrez
 */
export class Race {
  id: number | null;
  name: string | null;
  description: string | null;
  species: Species[];

  constructor(values: Partial<Race> = {}) {
    this.id = values.id ??= null;
    this.name = values.name ??= null;
    this.description = values.description ??= null;
    this.species = values.species ??= [];
  }
}
