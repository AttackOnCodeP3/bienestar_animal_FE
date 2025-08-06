import {Animal} from '../../animal';
import {VaccineApplicationDto} from './vaccine-application.dto';
import {SanitaryControlDto} from './sanitary-control.dto';


/**
 * CreateAnimalRequestDto is a Data Transfer Object (DTO) used for creating a new animal record.
 * @author dgutierrez
 */
export class CreateAnimalRequestDto {
  name: string | null;
  birthDate: Date | string | null;
  weight: number | null;
  speciesId: number | null;
  sexId: number | null;
  raceId: number | null;
  latitude: number | null;
  longitude: number | null;
  ownerIdentificationCard?: string;
  sanitaryControls: SanitaryControlDto[];
  vaccineApplications: VaccineApplicationDto[];

  constructor(values: Partial<CreateAnimalRequestDto>) {
    this.name = values.name ??= null;
    this.birthDate = values.birthDate ??= null;
    this.weight = values.weight ??= null;
    this.speciesId = values.speciesId ??= null;
    this.sexId = values.sexId ??= null;
    this.raceId = values.raceId ??= null;
    this.latitude = values.latitude ??= null;
    this.longitude = values.longitude ??= null;
    this.ownerIdentificationCard = values.ownerIdentificationCard;
    this.sanitaryControls = values.sanitaryControls ??= [];
    this.vaccineApplications = values.vaccineApplications ??= [];
  }

  /**
   * Creates a CreateAnimalRequestDto from an existing Animal object.
   * @param animal Partial<Animal> - The animal object to convert.
   * @return CreateAnimalRequestDto - The DTO representing the animal.
   * @author dgutierrez
   */
  fromAnimal(animal: Partial<Animal>) {
    const {name, race, weight, birthDate, latitude, longitude, species, sex} = animal;
    return new CreateAnimalRequestDto({
      name,
      birthDate,
      latitude,
      longitude,
      raceId: race?.id,
      sexId: sex?.id,
      speciesId: species?.id ?? null,
      weight,
    })
  }
}

