import {IVaccineApplied} from '@common/interfaces';

/**
 * Class representing a vaccine application for an animal.
 * @author dgutierrez
 */
export class VaccineApplicationDto {
  vaccineId: number | null;
  applicationDate: string | null;

  constructor(values: Partial<VaccineApplicationDto> = {}) {
    this.vaccineId = values.vaccineId ??= null;
    this.applicationDate = values.applicationDate ??= null;
  }

  /**
   * Creates a VaccineApplicationDto from an IVaccineApplied object.
   * @param vaccineApplied - The IVaccineApplied object to convert.
   * @returns A new instance of VaccineApplicationDto.
   * @author dgutierrez
   */
  static fromIVaccineApplied(vaccineApplied: Partial<IVaccineApplied>) {
    const {vaccineId, applicationDate} = vaccineApplied;
    return new VaccineApplicationDto({
      vaccineId,
      applicationDate
    });
  }
}
