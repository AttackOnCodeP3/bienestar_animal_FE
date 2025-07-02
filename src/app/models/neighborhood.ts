import {District} from './district';

/**
 * Neighborhood model representing a neighborhood in a district.
 * @author dgutierrez
 */
export class Neighborhood {
  id: number | null;
  name: string | null;
  district: District | null;

  constructor(values: Partial<Neighborhood> = {}) {
    this.id = values.id || null;
    this.name = values.name || null;
    this.district = values.district || null;
  }
}
