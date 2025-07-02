import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, tap} from 'rxjs';
import {User} from '@models';
import {Constants} from '@common/constants/constants';
import {IAuthority, ILoginResponse} from '@common/interfaces/http';
import {RollsEnum} from '@common/enums';

@Injectable({
  providedIn: 'root'
})
export class AuthHttpService {

  private accessToken: string | null;
  private expiresIn: number | null;
  private user: User = new User({email: '', authorities: []});

  private readonly httpClient = inject(HttpClient);

  constructor() {
    this.accessToken = null;
    this.expiresIn = null;
    this.load();
  }

  save(): void {
    if (this.user) localStorage.setItem('auth_user', JSON.stringify(this.user));

    if (this.accessToken)
      localStorage.setItem('access_token', JSON.stringify(this.accessToken));

    if (this.expiresIn)
      localStorage.setItem('expiresIn', JSON.stringify(this.expiresIn));
  }

  private load(): void {
    let token = localStorage.getItem('access_token');
    if (token) this.accessToken = token;
    let exp = localStorage.getItem('expiresIn');
    if (exp) this.expiresIn = JSON.parse(exp);
    const user = localStorage.getItem('auth_user');
    if (user) this.user = JSON.parse(user);
  }

  getUser(): User {
    return this.user;
  }

  getAccessToken(): string | null {
    return this.accessToken;
  }

  check(): boolean {
    return !!this.accessToken;
  }

  login(credentials: {
    email: string;
    password: string;
  }): Observable<ILoginResponse> {
    return this.httpClient.post<ILoginResponse>(Constants.apiBaseUrl + Constants.AUTH_LOGIN_URL, credentials).pipe(
      tap((response: any) => {
        this.accessToken = response.token;
        this.user.email = credentials.email;
        this.expiresIn = response.expiresIn;
        this.user = response.authUser;
        this.save();
      })
    );
  }

  registerUser(user: User) {
    return this.httpClient.post<ILoginResponse>(Constants.apiBaseUrl + Constants.AUTH_SIGN_UP_URL, user);
  }

  hasRole(role: string): boolean {
    return this.user.authorities ? this.user?.authorities.some(authority => authority.authority == role) : false;
  }

  isSuperAdmin(): boolean {
    return this.user.authorities ? this.user?.authorities.some(authority => authority.authority == RollsEnum.SUPER_ADMIN) : false;
  }

  hasAnyRole(roles: any[]): boolean {
    return roles.some(role => this.hasRole(role));
  }

  getPermittedRoutes(routes: any[]): any[] {
    let permittedRoutes: any[] = [];
    for (const route of routes) {
      if (route.data && route.data.authorities) {
        if (this.hasAnyRole(route.data.authorities)) {
          permittedRoutes.unshift(route);
        }
      }
    }
    return permittedRoutes;
  }

  logout() {
    this.accessToken = '';
    localStorage.removeItem('access_token');
    localStorage.removeItem('expiresIn');
    localStorage.removeItem('auth_user');
  }

  getUserAuthorities(): IAuthority[] | undefined {
    return this.getUser()?.authorities ?? undefined;
  }

  areActionsAvailable(routeAuthorities: string[]): boolean {
    // definición de las variables de validación
    let allowedUser: boolean = false;
    let isAdmin: boolean = false;
    // se obtienen los permisos del usuario
    let userAuthorities = this.getUserAuthorities();
    // se valida que sea una ruta permitida para el usuario
    for (const authority of routeAuthorities) {
      if (userAuthorities?.some(item => item.authority == authority)) {
        allowedUser = userAuthorities?.some(item => item.authority == authority)
      }
      if (allowedUser) break;
    }
    // se valida que el usuario tenga un rol de administración
    if (userAuthorities?.some(item => item.authority == RollsEnum.SUPER_ADMIN || item.authority == RollsEnum.SUPER_ADMIN)) {
      isAdmin = userAuthorities?.some(item => item.authority == RollsEnum.ADMIN || item.authority == RollsEnum.SUPER_ADMIN);
    }
    return allowedUser && isAdmin;
  }
}
