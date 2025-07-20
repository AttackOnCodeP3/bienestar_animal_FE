import {Animal} from './animal';
import {Vaccine} from './vaccine';

/**
 * Model representing a vaccine application for an animal.
 * This class is used to define the structure of a vaccine application entity.
 * @author dgutierrez
 */
export class VaccineApplication {
  id: number | null;
  animal: Animal | null;
  applicationDate: string | null;
  vaccine: Vaccine | null;

  constructor(values: Partial<VaccineApplication> = {}) {
    this.id = values.id ??= null;
    this.animal = values.animal ??= null;
    this.applicationDate = values.applicationDate ??= null;
    this.vaccine = values.vaccine ??= null;
  }
}
