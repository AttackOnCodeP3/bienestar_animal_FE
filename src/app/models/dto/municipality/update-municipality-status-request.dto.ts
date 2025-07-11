import {CreateMunicipalityRequestDTO} from './create-municipality-request.dto';

/**
 * DTO for creating a new municipality.
 * @author gjimenez
 * @modifiedby dgutierrez 10/7/2025 fix, passing to a class
 */
export interface UpdateMunicipalityRequestDTO extends CreateMunicipalityRequestDTO{
  id: number;
  name: string;
  status?: string;
}
