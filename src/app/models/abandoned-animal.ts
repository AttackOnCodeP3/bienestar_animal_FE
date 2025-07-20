/**
 * Model representing an abandoned animal.
 * Used for registration by census users.
 * @author gjimenez
 */
export class AbandonedAnimal {
  id: number | null;
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

  constructor(values: Partial<AbandonedAnimal> = {}) {
    this.id = values.id ?? null;
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
  }
}
