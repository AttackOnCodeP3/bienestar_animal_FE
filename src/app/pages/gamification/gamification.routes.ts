import {Routes} from '@angular/router';
import {RoutesUrlsEnum} from '@common/enums/routes-urls.enum';


export const GEMIFICATION_ROUTES: Routes = [
  {
    path: RoutesUrlsEnum.VOID_ROUTE,
    redirectTo: RoutesUrlsEnum.REWARDS_SYSTEM,
    pathMatch: 'full'
  },
  {
    path: RoutesUrlsEnum.REWARDS_SYSTEM,
    loadComponent: () => import('@pages/gamification/rewards-system/rewards-system').then(m => m.RewardsSystem),
  }
]
