import {MunicipalityStatusEnum} from '@common/enums';

export interface CreateMunicipalityRequestDTO {
  name: string;
  address?: string;
  phone?: string;
  email: string;
  cantonId: number;
  responsibleName?: string;
  responsiblePosition?: string;
}

export interface UpdateMunicipalityStatusRequestDTO {
  status: MunicipalityStatusEnum;
}

export interface UpdateResponsibleRequestDTO {
  responsibleName: string;
  responsibleRole: string;
}

export interface UpdateLogoRequestDTO {
  logo: string;
}

export interface UpdateMunicipalityRequestDTO {
  id: number;
  name: string;
  address?: string;
  phone?: string;
  email: string;
  cantonId: number;
  responsibleName?: string;
  responsiblePosition?: string;
  status?: string;
}
