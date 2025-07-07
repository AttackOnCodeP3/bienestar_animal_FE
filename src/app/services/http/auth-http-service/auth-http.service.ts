import {computed, inject, Injectable, signal} from '@angular/core';
import {Route} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {Observable, tap} from 'rxjs';
import {Constants} from '@common/constants/constants';
import {ILoginResponse} from '@common/interfaces/http';
import {RolesEnum} from '@common/enums';
import {LogService, StorageService} from '@services/general';
import {User} from '@models';
import {RegisterUserRequestDTO, CompleteProfileRequestDTO} from '@models/dto';

@Injectable({
  providedIn: 'root'
})
export class AuthHttpService {

  private readonly httpClient = inject(HttpClient);
  private readonly logService = inject(LogService)
  private readonly storageService = inject(StorageService);

  private readonly userSignal = signal<User>(new User({ email: '', authorities: [] }));
  private readonly accessTokenSignal = signal<string | null>(null);
  private readonly expiresInSignal = signal<number | null>(null);

  readonly isAuthenticated = computed(() => !!this.accessTokenSignal());
  readonly currentUser = computed(() => this.userSignal());
  readonly userAuthorities = computed(() => this.currentUser().authorities ?? []);
  readonly accessToken = computed(() => this.accessTokenSignal());

  constructor() {
    this.loadFromStorage();
  }

  /**
   * Stores the session data in localStorage.
   * @author dgutierrez
   */
  private saveToStorage(): void {
     this.storageService.set(Constants.LS_APP_AUTH_USER, this.currentUser());
    if (this.accessTokenSignal()) {
       this.storageService.set(Constants.LS_ACCESS_TOKEN, this.accessTokenSignal()!);
    }
    if (this.expiresInSignal()) {
       this.storageService.set(Constants.LS_EXPIRES_IN, this.expiresInSignal());
    }
  }

  /**
   * Loads the session data from localStorage into signals.
   * @author dgutierrez
   */
  private loadFromStorage(): void {
    const token = this.storageService.getRaw(Constants.LS_ACCESS_TOKEN);
    const expires = this.storageService.getRaw(Constants.LS_EXPIRES_IN);
    const user = this.storageService.get(Constants.LS_APP_AUTH_USER, data => new User(data));
    if (token) this.accessTokenSignal.set(token);
    if (expires) this.expiresInSignal.set(Number(expires));
    if (user) this.userSignal.set(user);
  }

  /**
   * Performs login with given credentials.
   * @param credentials User email and password
   * @returns Observable of login response
   * @author dgutierrez
   */
  login(credentials: { email: string; password: string }): Observable<ILoginResponse> {
    const url = `${Constants.apiBaseUrl}${Constants.AUTH_LOGIN_URL}`;
    return this.httpClient.post<ILoginResponse>(url, credentials).pipe(
      tap((response:ILoginResponse) => {
        this.logService.debug({
          message: 'Login successful',
          data: response,
          lineBreak: true
        })
        this.accessTokenSignal.set(response.token);
        this.expiresInSignal.set(response.expiresIn);
        this.userSignal.set(response.authUser);
        this.saveToStorage();
      })
    );
  }

  /**
   * Saves the login response to signals and localStorage.
   * @param response The login response containing token, user info, and expiration
   * @author dgutierrez
   */
  saveLoginResponseToSignalsAndStorage(response: ILoginResponse): void {
    this.accessTokenSignal.set(response.token);
    this.expiresInSignal.set(response.expiresIn);
    this.userSignal.set(response.authUser);
    this.saveToStorage();
  }

  /**
   * Registers a new user.
   * @returns Observable of registration result
   * @param registerUserRequestDTO Data Transfer Object for user registration
   * @author dgutierrez
   */
  registerUser(registerUserRequestDTO: RegisterUserRequestDTO): Observable<ILoginResponse> {
    return this.httpClient.post<ILoginResponse>(Constants.apiBaseUrl + Constants.AUTH_SIGN_UP_URL, registerUserRequestDTO);
  }

  /**
   * Completes the user profile after registration with social login.
   * @param completeUserRequestDTO Data Transfer Object for completing user profile
   * @return Observable of login response
   * @author dgutierrez
   */
  completeProfile(completeUserRequestDTO: CompleteProfileRequestDTO): Observable<ILoginResponse> {
    return this.httpClient.put<ILoginResponse>(Constants.apiBaseUrl + Constants.AUTH_SOCIAL_COMPLETE_USER_PROFILE_URL, completeUserRequestDTO).pipe(
      tap((response: ILoginResponse) => {
        this.saveLoginResponseToSignalsAndStorage(response);
      })
    );
  }

  /**
   * Clears session data and localStorage.
   * @author dgutierrez
   */
  logout(): void {
    this.accessTokenSignal.set(null);
    this.expiresInSignal.set(null);
    this.userSignal.set(new User({ email: '', authorities: [] }));

    this.storageService.remove(Constants.LS_ACCESS_TOKEN);
    this.storageService.remove(Constants.LS_EXPIRES_IN);
    this.storageService.remove(Constants.LS_APP_AUTH_USER);
  }

  /**
   * Verifies if current user has a specific role.
   * @param role Role string
   * @returns True if role is present
   * @author dgutierrez
   */
  hasRole(role: string): boolean {
    return this.userAuthorities().some(a => a.authority === role);
  }

  /**
   * Verifies if user has any of given roles.
   * @param roles List of role strings
   * @returns True if any match
   * @author dgutierrez
   */
  hasAnyRole(roles: RolesEnum[] | undefined): boolean {
    if (!roles || roles.length === 0) {
      this.logService.debug({
        message: 'No roles provided for hasAnyRole check',
        data: { roles }
      });
      return false;
    }
    return roles.some(role => this.hasRole(role));
  }

  /**
   * Checks if current user has super admin privileges.
   * @returns True if user is super admin
   * @author dgutierrez
   */
  isSuperAdmin(): boolean {
    return this.hasRole(RolesEnum.SUPER_ADMIN);
  }

  /**
   * Filters routes based on user authorities.
   * @param routes List of routes to evaluate
   * @returns Only routes the user can access
   * @author dgutierrez
   */
  getPermittedRoutes(routes: Route[]): Route[] {
    return routes.filter(r => r.data![Constants.AUTHORITIES] && this.hasAnyRole(r.data![Constants.AUTHORITIES]));
  }

  /**
   * Determines if user has both required route role and admin role.
   * @param requiredAuthorities List of route-required authorities
   * @returns True if conditions are met
   * @author dgutierrez
   */
  areActionsAvailable(requiredAuthorities: string[]): boolean {
    const hasRequiredRole = requiredAuthorities.some(r => this.hasRole(r));
    const isAdmin = this.hasRole(RolesEnum.MUNICIPAL_ADMIN) || this.hasRole(RolesEnum.SUPER_ADMIN);
    return hasRequiredRole && isAdmin;
  }

  /**
   * Sends a request to the backend endpoint responsible for finalizing the social login flow.
   *
   * This method uses `withCredentials: true` to ensure that cookies (such as `JSESSIONID`)
   * are included in the request, allowing the backend to recognize the authenticated session
   * established during the OAuth2 login (e.g., via Google).
   *
   * @returns An observable that emits the login response, including a JWT token and user information.
   * @author dgutierrez
   */
  getTokenFromSocialLogin(): Observable<ILoginResponse> {
    return this.httpClient.get<ILoginResponse>(`${Constants.apiBaseUrl}${Constants.AUTH_SOCIAL_SUCCESS_URL}`, {
      withCredentials: true
    }).pipe(tap((response: ILoginResponse) => {
      this.logService.debug({
        message: 'Social login successful',
        data: response,
        lineBreak: true
      });
    }));
  }
}
