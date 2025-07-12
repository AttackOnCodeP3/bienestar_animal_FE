import {Canton} from './canton';
import {MunicipalityStatusEnum} from '@common/enums';

/**
 * Municipality model representing a local government area.
 * @author dgutierrez
 * @modifiedBy gjimenez 08/7/2025  Added attributes: `phone`, `responsibleName`, `responsibleRole`, `responsibleEmail`, `status`, `logo`
 */
export class Municipality {
  address?: string | null;
  canton: Canton | null;
  email: string;
  id: number | null;
  logo?: string | null;
  name: string | null;
  phone?: string | null;
  responsibleEmail?: string | null;
  responsibleName?: string | null;
  responsibleRole?: string | null;
  status: MunicipalityStatusEnum | null;

  constructor(values: Partial<Municipality> = {}) {
    this.id = values.id ??= null;
    this.address = values.address ??= null;
    this.canton = values.canton ??= null;
    this.email = values.email ??= '';
    this.logo = values.logo ??= null;
    this.name = values.name ??= null;
    this.phone = values.phone ??= null;
    this.responsibleEmail = values.responsibleEmail ??= null;
    this.responsibleName = values.responsibleName ??= null;
    this.responsibleRole = values.responsibleRole ??= null;
    this.status = values.status ??= null;
  }
}
