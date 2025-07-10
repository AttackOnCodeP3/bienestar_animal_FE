
import {Canton} from './canton';
import {MunicipalityStatusEnum} from '@common/enums';

export interface Municipality {
  id: number;
  name: string;
  address?: string;
  phone?: string;
  email: string;
  responsibleName?: string;
  responsibleRole?: string;
  responsibleEmail?: string;
  status: MunicipalityStatusEnum;
  canton: Canton;
  logo?: string;
  createdAt?: string;
  updatedAt?: string;
}
