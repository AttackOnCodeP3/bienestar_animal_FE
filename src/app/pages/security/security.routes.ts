import {Routes} from '@angular/router';
import {RouteParamsEnum, RoutesUrlsEnum} from '@common/enums';

/**
 * Constants for defining route parameter paths in the Security module.
 * This object maps route parameter names to their corresponding paths,
 * allowing for easy reference and consistency across the application.
 * @author dgutierrez
 */
export const RouteParamPaths = {
  USER_ID: `/:${RouteParamsEnum.USER_ID}`,
};


export const SECURITY_ROUTES: Routes = [
  {
    path: '',
    redirectTo: RoutesUrlsEnum.SECURITY_USER_MANAGEMENT,
    pathMatch: 'full',
  },
  {
    path: RoutesUrlsEnum.SECURITY_USER_MANAGEMENT,
    loadComponent: () => import('@pages/security/user-management/user-management.page').then(m => m.UserManagementPage),
  },
  {
    path: RoutesUrlsEnum.SECURITY_CREATE_USER,
    loadComponent: () => import('@pages/security/create-user/create-user.page').then(m => m.CreateUserPage),
  },
  {
    path: RoutesUrlsEnum.SECURITY_EDIT_USER + RouteParamPaths.USER_ID,
    loadComponent: () => import('@pages/security/edit-user/edit-user.page').then(m => m.EditUserPage),
  }
]
