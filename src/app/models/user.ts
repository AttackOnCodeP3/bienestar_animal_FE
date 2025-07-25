import {Municipality} from './municipality';
import {Interest} from './interest';
import {Neighborhood} from './neighborhood';
import {IAuthority} from '@common/interfaces/http';
import {Role} from './role';

/**
 * User model representing a user in the system.
 * @author dgutierrez
 */
export class User {
  id: number | null;
  identificationCard: string | null;
  name: string | null;
  lastname: string | null;
  email: string | null;
  phoneNumber: string | null;
  birthDate: string | null;
  nurseryHome: boolean | null;
  temporaryPassword: string | null;
  requiresPasswordChange: boolean | null;
  active: boolean | null;
  password: string | null;
  registeredByCensusTaker: boolean | null;
  interests: Interest[] | null;
  municipality: Municipality | null;
  neighborhood: Neighborhood | null;
  authorities: IAuthority[] | null;
  socialLoginCompleted: boolean | null;
  usedSocialLogin: boolean | null;
  roles: Role[] | null;

  constructor(values: Partial<User> = {}) {
    this.id = values.id ??= null;
    this.identificationCard = values.identificationCard ??= null;
    this.name = values.name ??= null;
    this.lastname = values.lastname ??= null;
    this.email = values.email ??= null;
    this.phoneNumber = values.phoneNumber ??= null;
    this.birthDate = values.birthDate ??= null;
    this.nurseryHome = values.nurseryHome ??= null;
    this.temporaryPassword = values.temporaryPassword ??= null;
    this.requiresPasswordChange = values.requiresPasswordChange ??= null;
    this.active = values.active ??= null;
    this.password = values.password ??= null;
    this.registeredByCensusTaker = values.registeredByCensusTaker ??= null;
    this.interests = values.interests ??= null;
    this.municipality = values.municipality ??= null;
    this.neighborhood = values.neighborhood ??= null;
    this.authorities = values.authorities ??= null;
    this.socialLoginCompleted = values.socialLoginCompleted ??= null;
    this.usedSocialLogin = values.usedSocialLogin ??= null;
    this.roles = values.roles ??= null;
  }
}
