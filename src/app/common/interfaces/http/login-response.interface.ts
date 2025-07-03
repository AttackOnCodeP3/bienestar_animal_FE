import {User} from '@models';

/**
 * Interface representing the structure of a login response.
 * @author dgutierrez
 */
export interface ILoginResponse {
  token: string,
  authUser: User,
  expiresIn: number
}
