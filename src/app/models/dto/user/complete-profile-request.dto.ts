import {User} from '@models';

/**
 * DTO for completing user profile information.
 * This class is used to transfer data related to user profile completion.
 * It includes fields such as identification card, phone number, birth date,
 * nursery home status, neighborhood and municipality IDs, interests, and volunteer status.
 * It is designed to be used in forms where users can complete their profiles after social login.
 * @author dgutierrez
 */
export class CompleteProfileRequestDTO {
  birthDate: string | null;
  identificationCard: string | null;
  interestIds: number[];
  municipalityId: number | null;
  neighborhoodId: number | null;
  nurseryHome: boolean;
  phoneNumber: string | null;
  wantsToBeVolunteer: boolean;

  constructor(values: Partial<CompleteProfileRequestDTO> = {}) {
    this.birthDate = values.birthDate || null;
    this.identificationCard = values.identificationCard || null;
    this.interestIds = values.interestIds ? Array.from(values.interestIds) : [];
    this.municipalityId = values.municipalityId || null;
    this.neighborhoodId = values.neighborhoodId || null;
    this.nurseryHome = values.nurseryHome ?? false;
    this.phoneNumber = values.phoneNumber || null;
    this.wantsToBeVolunteer = values.wantsToBeVolunteer ?? false;
  }

  /**
   * Creates a CompleteProfileDTO instance from a User object.
   * @param user - Partial user object containing profile information.
   * @param wantsToBeVolunteer - Boolean indicating if the user wants to be a volunteer.
   * @author dgutierrez
   */
  static fromUser(user: Partial<User>, wantsToBeVolunteer: boolean): CompleteProfileRequestDTO{
    return new CompleteProfileRequestDTO({
      birthDate: user.birthDate || null,
      identificationCard: user.identificationCard || null,
      municipalityId: user.municipality?.id || null,
      neighborhoodId: user.neighborhood?.id || null,
      nurseryHome: user.nurseryHome || false,
      phoneNumber: user.phoneNumber || null,
      wantsToBeVolunteer: wantsToBeVolunteer,
      interestIds: user.interests
        ? user.interests
          .map(interest => interest?.id)
          .filter((id): id is number => id !== null && id !== undefined)
        : [],
    });
  }
}
