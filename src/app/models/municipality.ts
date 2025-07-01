import {Canton} from './canton';

/**
 * Municipality model representing a local government area.
 * @author dgutierrez
 */
export class Municipality {
  id: number | null;
  name: string | null;
  address: string | null;
  email: string | null;
  canton: Canton | null;

  constructor(values: Partial<Municipality> = {}) {
    this.id = values.id || null;
    this.name = values.name || null;
    this.address = values.address || null;
    this.email = values.email || null;
    this.canton = values.canton || null;
  }
}
