/**
 * SanitaryControlDto represents the data transfer object for sanitary control information.
 * It is used to encapsulate the details of a sanitary control record, including the last application date,
 * the product used, and references to the sanitary control type and response.
 * @author dgutierrez
 */
export class SanitaryControlDto {
  lastApplicationDate: string | null;
  productUsed: string | null;
  sanitaryControlTypeId: number | null;
  sanitaryControlResponseId: number | null;

  constructor(values: Partial<SanitaryControlDto> = {}) {
    this.lastApplicationDate = values.lastApplicationDate ??= null;
    this.productUsed = values.productUsed ??= null;
    this.sanitaryControlTypeId = values.sanitaryControlTypeId ??= null;
    this.sanitaryControlResponseId = values.sanitaryControlResponseId ??= null;
  }
}
