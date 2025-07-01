import {Component, computed, inject, signal, viewChild} from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {TranslatePipe} from '@ngx-translate/core';
import {MatToolbar, MatToolbarRow} from "@angular/material/toolbar";
import {MatIcon} from '@angular/material/icon';
import {MatIconButton} from "@angular/material/button";
import {BreakpointObserver} from '@angular/cdk/layout';
import {MatActionList, MatListItem, MatListItemIcon, MatNavList} from '@angular/material/list';
import {MatDrawerMode, MatSidenav, MatSidenavContainer, MatSidenavContent} from '@angular/material/sidenav';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatMenu, MatMenuItem, MatMenuTrigger} from '@angular/material/menu';
import {BreakpointsEnum} from '@common/enums';
import {IMenuItem} from '@common/interfaces';
import {ThemeService, I18nService} from '@services/general';
import {I18nMenuEnum} from '@common/enums/i18n';
import {Constants} from '@common/constants/constants';

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
    TranslatePipe,
  ],
  templateUrl: './dashboard-layout.component.html',
  styleUrl: './dashboard-layout.component.scss',
  changeDetection: Constants.changeDetectionStrategy
})
export class DashboardLayoutComponent {
  private readonly breakpointObserver: BreakpointObserver = inject(BreakpointObserver);
  readonly i18n = inject(I18nService);
  readonly theme = inject(ThemeService)

  readonly isScreenSmall = signal<boolean>(false);
  readonly sideNavMode = signal<MatDrawerMode>('side');
  readonly matSidenav = viewChild(MatSidenav);

  readonly menuItems = signal<IMenuItem[]>([
    {
      icon: 'home',
      label: I18nMenuEnum.HOME,
      route: 'home',
    },
    {
      icon: "pets",
      label: I18nMenuEnum.GAMIFICATION,
      route: 'gamification/rewards-system',
    },
    {
      icon: 'analytics',
      label: I18nMenuEnum.REPORTS,
      route: 'reports/report-1',
    },
    {
      icon: 'logout',
      label: I18nMenuEnum.LOGOUT,
      route: '',
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
