import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ILoginResponse} from '@common/interfaces/http';
import {User} from '@models';
import {Constants} from '@common/constants/constants';

@Injectable({
  providedIn: 'root'
})
export class AuthHttpService {

  private readonly httpClient = inject(HttpClient);

  constructor() { }

  registerUser(user: User) {
    return this.httpClient.post<ILoginResponse>(Constants.apiBaseUrl + Constants.AUTH_SIGN_UP_URL, user);
  }
}
