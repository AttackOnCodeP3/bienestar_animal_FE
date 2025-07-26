/**
 * MunicipalPreventiveCareConfigurationDTO
 * This class represents the data transfer object for municipal preventive care configuration.
 * @author dgutierrez
 */
export class MunicipalPreventiveCareConfigurationDTO {
  id: number | null;
  type: string | null;
  value: number | null;

  constructor(values: Partial<MunicipalPreventiveCareConfigurationDTO> = {}) {
    this.id = values.id ??= null;
    this.type = values.type ??= null;
    this.value = values.value ??= null;
  }
}
