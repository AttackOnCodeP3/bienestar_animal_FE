import {Routes} from '@angular/router';
import {RoutesUrlsEnum} from '@common/enums/routes-urls.enum';


/**
 * Defines the routing configuration for the gamification module.
 *
 * - Redirects the base gamification route (`VOID_ROUTE`) to the rewards system route (`REWARDS_SYSTEM`).
 * - Loads the `RewardsSystem` component lazily when navigating to the rewards system route.
 *
 * @type {Routes}
 *
 * @author dgutierrez
 */
export const GAMIFICATION_ROUTES: Routes = [
  {
    path: RoutesUrlsEnum.VOID_ROUTE,
    redirectTo: RoutesUrlsEnum.REWARDS_SYSTEM,
    pathMatch: 'full'
  },
  {
    path: RoutesUrlsEnum.REWARDS_SYSTEM,
    loadComponent: () => import('@pages/gamification/rewards-system/rewards-system.page').then(m => m.RewardsSystemPage),
  }
]
