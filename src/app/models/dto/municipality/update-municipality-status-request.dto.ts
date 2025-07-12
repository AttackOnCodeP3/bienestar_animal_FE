import {Municipality} from '@models';

/**
 * DTO for creating a new municipality.
 * @author gjimenez
 * @modifiedby dgutierrez 10/7/2025 fix, passing to a class
 */
export class UpdateMunicipalityRequestDTO {
  id: number | null;
  name: string | null;
  address?: string | null;
  phone?: string | null;
  email: string | null;
  cantonId: number | null;
  responsibleName?: string | null;
  responsibleRole?: string | null;
  municipalityStatusId?: number | null;

  constructor(values: Partial<UpdateMunicipalityRequestDTO> = {}) {
    this.id = values.id ??= null;
    this.name = values.name ??= null;
    this.address = values.address ??= null;
    this.phone = values.phone ??= null;
    this.email = values.email ??= null;
    this.cantonId = values.cantonId ??= null;
    this.responsibleName = values.responsibleName ??= null;
    this.responsibleRole = values.responsibleRole ??= null;
    this.municipalityStatusId = values.municipalityStatusId ??= null;
  }

  /**
   * Creates an instance of UpdateMunicipalityRequestDTO from a Municipality object.
   * @param municipality The Municipality object to convert.
   * @return An instance of UpdateMunicipalityRequestDTO.
   * @author dgutierrez
   */
  static fromMunicipality(municipality: Partial<Municipality>): UpdateMunicipalityRequestDTO {
    return new UpdateMunicipalityRequestDTO({
      municipalityStatusId: municipality.status?.id,
      address: municipality.address,
      cantonId: municipality.canton?.id,
      email: municipality.email,
      id: municipality.id,
      name: municipality.name,
      phone: municipality.phone,
      responsibleName: municipality.responsibleName,
      responsibleRole: municipality.responsibleRole,
    });
  }
}
