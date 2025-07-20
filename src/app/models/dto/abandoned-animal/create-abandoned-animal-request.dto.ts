import {AbandonedAnimal} from '../../abandoned-animal';

/**
 * DTO for creating an abandoned animal record.
 * Used to send the payload to the backend.
 * @author gjimenez
 */
export class CreateAbandonedAnimalRequestDTO {
  species: string | null;
  sex: string | null;
  estimatedAge: string | null;
  physicalCondition: string | null;
  behavior: string | null;
  district: string | null;
  neighborhood: string | null;
  observations: string | null;
  latitude: number | null;
  longitude: number | null;
  photoBase64?: string | null;
  canton: number | null;

  constructor(values: Partial<CreateAbandonedAnimalRequestDTO> = {}) {
    this.species = values.species ?? null;
    this.sex = values.sex ?? null;
    this.estimatedAge = values.estimatedAge ?? null;
    this.physicalCondition = values.physicalCondition ?? null;
    this.behavior = values.behavior ?? null;
    this.district = values.district ?? null;
    this.neighborhood = values.neighborhood ?? null;
    this.observations = values.observations ?? null;
    this.latitude = values.latitude ?? null;
    this.longitude = values.longitude ?? null;
    this.photoBase64 = values.photoBase64 ?? null;
    this.canton = values.canton ?? null;
  }

  static fromAbandonedAnimal(animal: Partial<AbandonedAnimal>): CreateAbandonedAnimalRequestDTO {
    return new CreateAbandonedAnimalRequestDTO({
      species: animal.species,
      sex: animal.sex,
      estimatedAge: animal.estimatedAge,
      physicalCondition: animal.physicalCondition,
      behavior: animal.behavior,
      observations: animal.observations,
      latitude: animal.latitude,
      longitude: animal.longitude,
      photoBase64: animal.photoBase64
    });
  }
}
