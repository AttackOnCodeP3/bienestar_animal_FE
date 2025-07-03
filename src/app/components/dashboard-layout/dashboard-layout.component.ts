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
import {BreakpointsEnum, RoutesUrlsEnum} from '@common/enums';
import {IMenuItem, IMenuItemChild} from '@common/interfaces';
import {ThemeService, I18nService} from '@services/general';
import {I18nMenuEnum} from '@common/enums/i18n';
import {Constants} from '@common/constants/constants';
import {AuthHttpService} from '@services/http';

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
  private readonly authService = inject(AuthHttpService);

  readonly isScreenSmall = signal<boolean>(false);
  readonly sideNavMode = signal<MatDrawerMode>('side');
  readonly matSidenav = viewChild(MatSidenav);

  readonly menuItems = signal<IMenuItem[]>([
    {
      icon: 'home',
      label: I18nMenuEnum.HOME,
      route: 'home',
      click: () => {
      }
    },
    {
      icon: "pets",
      label: I18nMenuEnum.GAMIFICATION,
      route: 'gamification/rewards-system',
      click: () => {
      },
    },
    {
      icon: 'analytics',
      label: I18nMenuEnum.REPORTS,
      route: 'reports/report-1',
      click: () => {
      }
    },
    {
      icon: 'logout',
      label: I18nMenuEnum.LOGOUT,
      route: '',
      click: () => this.authService.logout(),
    }
  ])

  /**
   * A computed signal that returns the sorted list of menu items with the following order:
   *
   * 1. The item with route === 'home' (if it exists) appears first.
   * 2. Items with children (submenus) come next.
   * 3. Items without children are listed last.
   *
   * This sorting improves the structure and visual grouping of the menu in the UI.
   * Null or undefined values (if 'home' is not found) are filtered out using `.filter(Boolean)`.
   *
   * @example
   * // Given menuItems = [about, home, dashboard(with children), settings]
   * // Result: [home, dashboard, about, settings]
   *
   * @author dgutierrez
   */
  readonly menuItemsSorted = computed(() => {
    const items = this.menuItems();
    const home = items.find(item => item.route === RoutesUrlsEnum.HOME);
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

  /**
   * Returns the icon for a menu item.
   * @param item The menu item to get the icon for.
   * @author dgutierrez
   */
  getTabIndex(item: IMenuItem | IMenuItemChild | undefined): number {
    return item?.isDisabled ? -1 : 0
  }
}
