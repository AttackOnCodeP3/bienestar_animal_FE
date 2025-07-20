import {IVaccineApplied} from '@common/interfaces';

/**
 * Class representing a vaccine application for an animal.
 * @author dgutierrez
 */
export class VaccineApplicationDto {
  vaccineId: string | null;
  applicationDate: string | null;

  constructor(values: Partial<VaccineApplicationDto> = {}) {
    this.vaccineId = values.vaccineId ??= null;
    this.applicationDate = values.applicationDate ??= null;
  }

  fromIVaccineApplied(vaccineApplied: Partial<IVaccineApplied>) {
    const {vaccineId, applicationDate} = vaccineApplied;
    return new VaccineApplicationDto({
      vaccineId,
      applicationDate,
    });
  }
}
