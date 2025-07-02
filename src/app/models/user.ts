import {Municipality} from './municipality';
import {Interest} from './interest';

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
  isNurseryHome: boolean | null;
  temporaryPassword: string | null;
  requiresPasswordChange: boolean | null;
  isActive: boolean | null;
  password: string | null;
  registeredByCensusTaker: boolean | null;
  interests: Interest[] | null;
  municipality: Municipality | null;

  constructor(values: Partial<User> = {}) {
    this.id = values.id || null;
    this.identificationCard = values.identificationCard || null;
    this.name = values.name || null;
    this.lastname = values.lastname || null;
    this.email = values.email || null;
    this.phoneNumber = values.phoneNumber || null;
    this.birthDate = values.birthDate || null;
    this.isNurseryHome = values.isNurseryHome || null;
    this.temporaryPassword = values.temporaryPassword || null;
    this.requiresPasswordChange = values.requiresPasswordChange || null;
    this.isActive = values.isActive || null;
    this.password = values.password || null;
    this.registeredByCensusTaker = values.registeredByCensusTaker || null;
    this.interests = values.interests || null;
    this.municipality = values.municipality || null;
  }
}
