import {SanitaryControlType} from './sanitary-control-type';
import {SanitaryControlResponse} from './sanitary-control-response';

/**
 * SanitaryControl class represents a model for sanitary control data.
 * @author dgutierrez
 */
export class SanitaryControl {
  id: number | null;
  lastApplicationDate: string | null;
  productUsed: string | null;
  sanitaryControlType: SanitaryControlType | null;
  sanitaryControlResponse: SanitaryControlResponse | null;

  constructor(values: Partial<SanitaryControl> = {}) {
    this.id = values.id ??= null;
    this.lastApplicationDate = values.lastApplicationDate ??= null;
    this.productUsed = values.productUsed ??= null;
    this.sanitaryControlType = values.sanitaryControlType ??= null;
    this.sanitaryControlResponse = values.sanitaryControlResponse ??= null;
  }
}
