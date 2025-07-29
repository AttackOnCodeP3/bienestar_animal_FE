import {MunicipalPreventiveCareConfigurationEnum} from '@common/enums';

/**
 * Model representing the configuration for municipal preventive care.
 * @author dgutierrez
 */
export class MunicipalPreventiveCareConfiguration {
  id: number | null;
  value: number | null;
  type: MunicipalPreventiveCareConfigurationEnum | null;

  constructor(values: Partial<MunicipalPreventiveCareConfiguration> = {}) {
    this.id = values.id ??= null;
    this.value = values.value ??= null;
    this.type = values.type ??= null;
  }
}
