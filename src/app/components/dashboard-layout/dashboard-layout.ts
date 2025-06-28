import {Component, computed, inject, signal, viewChild} from '@angular/core';
import {Router, RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {MatToolbar, MatToolbarRow} from "@angular/material/toolbar";
import {MatIconButton} from "@angular/material/button";
import {MatActionList, MatListItem, MatListItemIcon, MatNavList} from '@angular/material/list';
import {MatDrawerMode, MatSidenav, MatSidenavContainer, MatSidenavContent} from '@angular/material/sidenav';
import {MatIcon} from '@angular/material/icon';
import {BreakpointObserver} from '@angular/cdk/layout';
import {BreakpointsEnum} from '@common/enums';
import {IMenuItem} from '@common/interfaces';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatMenu, MatMenuItem, MatMenuTrigger} from '@angular/material/menu';
import {TitleCasePipe} from '@angular/common';
import {Theme} from '@services/theme-service/theme';

@Component({
  selector: 'app-dashboard-layout',
  imports: [
    MatActionList,
    MatExpansionModule,
    MatIcon,
    MatIconButton,
    MatListItem,
    MatListItemIcon,
    MatMenu,
    MatMenuItem,
    MatMenuTrigger,
    MatNavList,
    MatSidenav,
    MatSidenavContainer,
    MatSidenavContent,
    MatToolbar,
    MatToolbarRow,
    RouterLink,
    RouterLinkActive,
    RouterOutlet,
    TitleCasePipe,
  ],
  templateUrl: './dashboard-layout.html',
  styleUrl: './dashboard-layout.scss',
})
export class DashboardLayout {
  private readonly breakpointObserver: BreakpointObserver = inject(BreakpointObserver);
  readonly theme = inject(Theme)

  readonly isScreenSmall = signal<boolean>(false);
  readonly sideNavMode = signal<MatDrawerMode>('side');
  readonly matSidenav = viewChild(MatSidenav);

  readonly menuItems = signal<IMenuItem[]>([
    {
      icon: 'home',
      label: 'Home',
      route: 'home',
      isDisabled: false
    },
    {
      icon: 'home',
      label: 'Gemification',
      route: 'gamification/rewards-system',
      isDisabled: false,
      children: [
        {
          label: 'Gemification',
          route: 'gamification/rewards-system',
          isDisabled: true,
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
          isDisabled: true,
        },
        {
          label: 'Reports',
          route: 'reports/report-1',
          isDisabled: true
        },
        {
          label: 'Logout',
          route: 'reports/report-1',
          isDisabled: true
        }
      ]
    },
    {
      icon: 'logout',
      label: 'Logout',
      route: '',
      isDisabled: true
    }
  ])

  readonly menuItemsSorted = computed(() => {
    const items = this.menuItems();
    const home = items.find(item => item.route === 'home');
    const withChildren = items.filter(item => item !== home && item.children?.length);
    const withoutChildren = items.filter(item => item !== home && (!item.children || item.children.length === 0));
    return [home, ...withChildren, ...withoutChildren].filter(Boolean);
  });

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
}
