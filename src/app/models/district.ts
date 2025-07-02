import {Canton} from './canton';

/**
 * District model representing a district in a canton.
 * @author dgutierrez
 */
export class District {
  id: number | null;
  name: string | null;
  canton: Canton | null;

  constructor(values: Partial<District> = {}) {
    this.id = values.id || null;
    this.name = values.name || null;
    this.canton = values.canton || null;
  }
}
