import {Municipality} from '@models';

/**
 * DTO for creating a new municipality.
 * @author gjimenez
 * @modifiedby dgutierrez 10/7/2025 fix, passing to a class
 */
export class CreateMunicipalityRequestDTO {
  name: string | null;
  address: string | null;
  phone: string | null;
  email: string | null;
  cantonId: number | null;
  responsibleName?: string | null;
  responsiblePosition?: string | null;

  constructor(values: Partial<CreateMunicipalityRequestDTO> = {}) {
    this.name = values.name ??= null;
    this.address = values.address ??= null;
    this.phone = values.phone ??= null;
    this.email = values.email ??= null;
    this.cantonId = values.cantonId ??= null;
    this.responsibleName = values.responsibleName ??= null;
    this.responsiblePosition = values.responsiblePosition ??= null;
  }

  /**
   * Creates an instance of CreateMunicipalityRequestDTO from a Municipality object.
   * @param municipality The Municipality object to convert.
   * @return An instance of CreateMunicipalityRequestDTO.
   * @author dgutierrez
   */
  static fromMunicipality(municipality: Partial<Municipality>): CreateMunicipalityRequestDTO {
    return new CreateMunicipalityRequestDTO({
      cantonId: municipality.canton?.id,
      address: municipality.address,
      email: municipality.email,
      name: municipality.name,
      phone: municipality.phone,
      responsibleName: municipality.responsibleName,
      responsiblePosition: municipality.responsibleRole
    });
  }
}
