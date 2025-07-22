import {Species} from './species';
import {Race} from './race';
import {Sex} from './sex';
import {AnimalType} from './animal-type';
import {SanitaryControl} from './sanitary-control';

/**
 * Entity representing an animal.
 * This class is used to define the basic structure of an animal entity.
 * @author dgutierrez
 * @updatedBy gjimenez
 */
export class Animal {
  id: number | null;
  name: string | null;
  weight: number | null;
  species: Species | null;
  race: Race | null;
  sex: Sex | null;
  birthDate: string | null;
  animalType: AnimalType | null;
  latitude: number | null;
  longitude: number | null;
  sanitaryControls: SanitaryControl[] | null;
  // TODO:   /*  age: AgeDto | null;*/
  createdAt: string | null;
  updatedAt: string | null;

  constructor(values: Partial<Animal> = {}) {
    this.id = values.id ?? null;
    this.name = values.name ?? null;
    this.weight = values.weight ?? null;
    this.species = values.species ?? null;
    this.race = values.race ?? null;
    this.sex = values.sex ?? null;
    this.birthDate = values.birthDate ?? null;
    this.animalType = values.animalType ?? null;
    this.latitude = values.latitude ?? null;
    this.longitude = values.longitude ?? null;
    this.sanitaryControls = values.sanitaryControls ?? null;
    this.createdAt = values.createdAt ?? null;
    this.updatedAt = values.updatedAt ?? null;
  }
}
