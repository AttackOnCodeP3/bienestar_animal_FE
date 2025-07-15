import {User} from '@models';

/**
 * DTO for updating a user.
 * @author dgutierrez
 */
export class UpdateUserRequestDto {
  id: number | null;
  identificationCard: string | null;
  name: string | null;
  lastname: string | null;
  email: string | null;
  phoneNumber: string | null;
  birthDate: string | null;
  nurseryHome: boolean | null;
  requiresPasswordChange: boolean | null;
  active: boolean | null;
  registeredByCensusTaker: boolean | null;
  socialLoginCompleted: boolean | null;
  usedSocialLogin: boolean | null;
  municipalityId: number | null;
  neighborhoodId: number | null;
  interestIds: number[];
  roleIds: number[];

  constructor(values: Partial<UpdateUserRequestDto> = {}) {
    this.id = values.id ??= null;
    this.identificationCard = values.identificationCard ??= null;
    this.name = values.name ??= null;
    this.lastname = values.lastname ??= null;
    this.email = values.email ??= null;
    this.phoneNumber = values.phoneNumber ??= null;
    this.birthDate = values.birthDate ??= null;
    this.nurseryHome = values.nurseryHome ??= null;
    this.requiresPasswordChange = values.requiresPasswordChange ??= null;
    this.active = values.active ??= null;
    this.registeredByCensusTaker = values.registeredByCensusTaker ??= null;
    this.socialLoginCompleted = values.socialLoginCompleted ??= null;
    this.usedSocialLogin = values.usedSocialLogin ??= null;
    this.municipalityId = values.municipalityId ??= null;
    this.neighborhoodId = values.neighborhoodId ??= null;
    this.interestIds = values.interestIds ? Array.from(values.interestIds) : [];
    this.roleIds = values.roleIds ? Array.from(values.roleIds) : [];
  }

  /**
   * Creates an UpdateUserDTO from a User model.
   * @param user The User model to convert.
   * @return An instance of UpdateUserDTO populated with the user's data.
   * @author dgutierrez
   */
  static fromUser(user: User): UpdateUserRequestDto {
    return new UpdateUserRequestDto({
      id: user.id,
      identificationCard: user.identificationCard,
      name: user.name,
      lastname: user.lastname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      birthDate: user.birthDate,
      nurseryHome: user.nurseryHome,
      requiresPasswordChange: user.requiresPasswordChange,
      active: user.active,
      registeredByCensusTaker: user.registeredByCensusTaker,
      socialLoginCompleted: user.socialLoginCompleted,
      usedSocialLogin: user.usedSocialLogin,
      municipalityId: user.municipality?.id,
      neighborhoodId: user.neighborhood?.id,
      interestIds: Array.from(user.interests || [])
        .map(interest => interest.id)
        .filter((id): id is number => id !== null && id !== undefined),
      roleIds: Array.from(user.roles || [])
        .map(role => role.id)
        .filter((id): id is number => id !== null && id !== undefined),
    });
  }
}
