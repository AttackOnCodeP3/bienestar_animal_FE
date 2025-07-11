/**
 * DTO for creating a new municipality.
 * @author gjimenez
 * @modifiedby dgutierrez 10/7/2025 fix, passing to a class
 */
export class CreateMunicipalityRequestDTO {
  name: string;
  address?: string;
  phone?: string;
  email: string;
  cantonId: number;
  responsibleName?: string;
  responsiblePosition?: string;

  constructor(values: Partial<CreateMunicipalityRequestDTO> = {}) {
    this.name = values.name || '';
    this.address = values.address || '';
    this.phone = values.phone || '';
    this.email = values.email || '';
    this.cantonId = values.cantonId ?? 0;
    this.responsibleName = values.responsibleName || '';
    this.responsiblePosition = values.responsiblePosition || '';
  }
}
