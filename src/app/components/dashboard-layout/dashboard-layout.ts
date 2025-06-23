import {Component, inject, signal, viewChild} from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {MatToolbar, MatToolbarRow} from "@angular/material/toolbar";
import {MatIconButton} from "@angular/material/button";
import {MatActionList, MatListItem, MatListItemIcon, MatNavList} from '@angular/material/list';
import {MatDrawerMode, MatSidenav, MatSidenavContainer, MatSidenavContent} from '@angular/material/sidenav';
import {MatIcon} from '@angular/material/icon';
import {BreakpointObserver} from '@angular/cdk/layout';
import {BreakpointsEnum} from '@common/enums';
import {IMenuItem} from '@common/interfaces';
import {MatExpansionModule} from '@angular/material/expansion';


@Component({
  selector: 'app-dashboard-layout',
  imports: [
    MatIcon,
    MatIconButton,
    MatListItem,
    MatListItemIcon,
    MatNavList,
    MatSidenav,
    MatSidenavContainer,
    MatSidenavContent,
    MatToolbar,
    MatToolbarRow,
    RouterLink,
    RouterLinkActive,
    RouterOutlet,
    MatExpansionModule,
    MatActionList,
  ],
  templateUrl: './dashboard-layout.html',
  styleUrl: './dashboard-layout.scss',
})
export class DashboardLayout {
  private readonly breakpointObserver: BreakpointObserver = inject(BreakpointObserver);

  readonly isScreenSmall = signal<boolean>(false);
  readonly sideNavMode = signal<MatDrawerMode>('side');
  readonly matSidenav = viewChild(MatSidenav);

  constructor() {
    this.breakpointObserver.observe([`(max-width:${BreakpointsEnum.XL}px)`]).subscribe(result => {
      if (result.matches) {
        this.sideNavMode.set("over");
        this.isScreenSmall.set(true);
      } else {
        this.sideNavMode.set("side");
        this.isScreenSmall.set(false);
      }
    })
  }

  menuItems: IMenuItem[] = [
    {
      icon: 'home',
      label: 'Gemification',
      route: 'gamification/rewards-system',
      isDisabled: false,
      children: [
        {
          label: 'Gemification',
          route: 'gamification/rewards-system',
          isDisabled: false,
        },
        {
          label: 'Reports',
          route: 'reports/report-1',
          isDisabled: false
        },
        {
          label: 'Logout',
          route: 'reports/report-1',
          isDisabled: false
        }
      ]
    },
    {
      icon: 'assessment',
      label: 'Reports',
      route: 'reports/report-1',
      isDisabled: false,
      children: [
        {
          label: 'Gemification',
          route: 'gamification/rewards-system',
          isDisabled: false,
        },
        {
          label: 'Reports',
          route: 'reports/report-1',
          isDisabled: false
        },
        {
          label: 'Logout',
          route: 'reports/report-1',
          isDisabled: false
        }
      ]
    },
    {
      icon: 'logout',
      label: 'Logout',
      route: '',
      isDisabled: false
    }
  ]
}
