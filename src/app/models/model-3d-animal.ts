/**
 * Model representing a 3D model of an animal from model_3d_animal table
 * @author nav
 */
export class Model3DAnimal {
  id: number | null;
  createdAt: Date | null;
  fechaGeneracion: string | null;
  updatedAt: Date | null;
  urlModelo: string | null;
  animalId: number | null;
  stateGenerationId: number | null;
  photoOriginalUrl: string | null;

  constructor(values: Partial<Model3DAnimal> = {}) {
    this.id = values.id ?? null;
    this.createdAt = values.createdAt ?? null;
    this.fechaGeneracion = values.fechaGeneracion ?? null;
    this.updatedAt = values.updatedAt ?? null;
    this.urlModelo = values.urlModelo ?? null;
    this.animalId = values.animalId ?? null;
    this.stateGenerationId = values.stateGenerationId ?? null;
    this.photoOriginalUrl = values.photoOriginalUrl ?? null;
  }
}
