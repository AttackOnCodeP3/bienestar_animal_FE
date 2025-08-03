import {User} from '@models';

/**
 * DTO for registering a user.
 * @author dgutierrez
 */
export class RegisterUserRequestDTO {
  name: string | null;
  lastname: string | null;
  email: string | null;
  password: string | null;
  phoneNumber: string | null;
  identificationCard: string | null;
  birthDate: string | null;
  municipalityId: number | null;
  neighborhoodId: number | null;
  wantsToBeVolunteer: boolean;
  interestIds: number[];
  roleIds: number[];
  registeredByCensusTaker: boolean;

  constructor(values: Partial<RegisterUserRequestDTO> = {}) {
    this.name = values.name || null;
    this.lastname = values.lastname || null;
    this.email = values.email || null;
    this.password = values.password || null;
    this.phoneNumber = values.phoneNumber || null;
    this.identificationCard = values.identificationCard || null;
    this.birthDate = values.birthDate || null;
    this.municipalityId = values.municipalityId || null;
    this.neighborhoodId = values.neighborhoodId || null;
    this.wantsToBeVolunteer = values.wantsToBeVolunteer ?? false;
    this.interestIds = values.interestIds ? Array.from(values.interestIds) : [];
    this.roleIds = values.roleIds ? Array.from(values.roleIds) : [];
    this.registeredByCensusTaker = values.registeredByCensusTaker ??= false;
  }

  /**
   * Creates a RegisterUserRequestDTO from a User object.
   * @param user - The User object to convert.
   * @param wantsToBeVolunteer - Indicates if the user wants to be a volunteer.
   * @returns A new instance of RegisterUserRequestDTO.
   * @author dgutierrez
   */
  static fromUser(user: Partial<User>, wantsToBeVolunteer: boolean = false): RegisterUserRequestDTO {
    return new RegisterUserRequestDTO({
      name: user.name,
      lastname: user.lastname,
      email: user.email,
      password: user.password,
      phoneNumber: user.phoneNumber,
      identificationCard: user.identificationCard,
      birthDate: user.birthDate,
      municipalityId: user.municipality?.id,
      neighborhoodId: user.neighborhood?.id,
      wantsToBeVolunteer: wantsToBeVolunteer,
      registeredByCensusTaker: false,
      roleIds: user.roles
        ? user.roles
          .map(role => role?.id)
          .filter((id): id is number => id !== null && id !== undefined)
        : [],
      interestIds: user.interests
        ? user.interests
          .map(interest => interest?.id)
          .filter((id): id is number => id !== null && id !== undefined)
        : [],
    });
  }
}
