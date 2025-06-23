import {Routes} from '@angular/router';


export const GEMIFICATION_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'rewards-system',
    pathMatch: 'full'
  },
  {
    path: 'rewards-system',
    loadComponent: () => import('@pages/gamification/rewards-system/rewards-system').then(m => m.RewardsSystem),
  }
]
