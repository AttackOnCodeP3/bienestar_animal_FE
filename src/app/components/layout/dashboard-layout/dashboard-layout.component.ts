import {Component, computed, inject, signal, viewChild} from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {TranslatePipe} from '@ngx-translate/core';
import {MatIcon} from '@angular/material/icon';
import {BreakpointObserver} from '@angular/cdk/layout';
import {MatActionList, MatListItem, MatListItemIcon, MatNavList,} from '@angular/material/list';
import {MatDrawerMode, MatSidenav, MatSidenavContainer, MatSidenavContent,} from '@angular/material/sidenav';
import {MatExpansionModule} from '@angular/material/expansion';
import {BreakpointsEnum, RolesEnum, RoutesUrlsEnum} from '@common/enums';
import {IMenuItem, IMenuItemChild} from '@common/interfaces';
import {I18nService, ThemeService} from '@services/general';
import {I18nMenuEnum} from '@common/enums/i18n';
import {Constants} from '@common/constants/constants';
import {AuthHttpService} from '@services/http';
import { NavbarComponent, FooterComponent } from '@components/general';

@Component({
  selector: 'app-dashboard-layout',
  imports: [
    MatActionList,
    MatExpansionModule,
    MatIcon,
    MatListItem,
    MatListItemIcon,
    MatNavList,
    MatSidenav,
    MatSidenavContainer,
    MatSidenavContent,
    NavbarComponent,
    RouterLink,
    RouterLinkActive,
    RouterOutlet,
    TranslatePipe,
    FooterComponent
],
  templateUrl: './dashboard-layout.component.html',
  styleUrl: './dashboard-layout.component.scss',
  changeDetection: Constants.changeDetectionStrategy,
})
export class DashboardLayoutComponent {
  private readonly breakpointObserver: BreakpointObserver =
    inject(BreakpointObserver);
  readonly authHttpService = inject(AuthHttpService);
  readonly i18n = inject(I18nService);
  readonly theme = inject(ThemeService);

  readonly isScreenSmall = signal<boolean>(false);
  readonly sideNavMode = signal<MatDrawerMode>('side');
  readonly matSidenav = viewChild(MatSidenav);

  readonly allRoles = signal(Object.values(RolesEnum));

  readonly menuItems = signal<IMenuItem[]>([
    {
      icon: 'home',
      label: I18nMenuEnum.HOME,
      route: RoutesUrlsEnum.HOME,
      click: () => {
        this.closeSidenav();
      },
      authorities: [
        RolesEnum.SUPER_ADMIN,
        RolesEnum.MUNICIPAL_ADMIN,
        RolesEnum.VOLUNTEER_USER,
        RolesEnum.COMMUNITY_USER,
      ],
    },
  
    {
      icon: 'analytics',
      label: I18nMenuEnum.REPORTS,
  route: `${RoutesUrlsEnum.REPORTS}${RoutesUrlsEnum.SLASH}${RoutesUrlsEnum.REPORT_1}`,
      click: () => {
        this.closeSidenav();
      },
      authorities: [RolesEnum.SUPER_ADMIN, RolesEnum.MUNICIPAL_ADMIN],
    },

    {
      icon: 'settings',
      label: I18nMenuEnum.USER_MANAGEMENT,
      route: `${RoutesUrlsEnum.SECURITY}${RoutesUrlsEnum.SLASH}${RoutesUrlsEnum.SECURITY_USER_MANAGEMENT}`,
      click: () => {
      },
      children: [
        {
          label: I18nMenuEnum.USER_MANAGEMENT,
          route: `${RoutesUrlsEnum.SECURITY}${RoutesUrlsEnum.SLASH}${RoutesUrlsEnum.SECURITY_USER_MANAGEMENT}`,
          click: () => {
            this.closeSidenav();
          },
          authorities: [RolesEnum.SUPER_ADMIN],
        },
        {
          label: I18nMenuEnum.CREATE_USER,
          route: `${RoutesUrlsEnum.SECURITY}${RoutesUrlsEnum.SLASH}${RoutesUrlsEnum.SECURITY_CREATE_USER}`,
          click: () => {
            this.closeSidenav();
          },
          authorities: [RolesEnum.SUPER_ADMIN],
        },
      ],
      authorities: [RolesEnum.SUPER_ADMIN],
    },
    {
      icon: 'apartment',
      label: I18nMenuEnum.MUNICIPALITIES,
      authorities: [RolesEnum.SUPER_ADMIN],
      click: () => {
      },
      children: [
        {
          label: I18nMenuEnum.VIEW_MUNICIPALITIES,
          route: `${RoutesUrlsEnum.MUNICIPALITIES}${RoutesUrlsEnum.SLASH}${RoutesUrlsEnum.MUNICIPALITY_LIST}`,
          authorities: [RolesEnum.SUPER_ADMIN],
          click: () => this.closeSidenav(),
        },
        {
          label: I18nMenuEnum.CREATE_MUNICIPALITY,
          route: `${RoutesUrlsEnum.MUNICIPALITIES}${RoutesUrlsEnum.SLASH}${RoutesUrlsEnum.MUNICIPALITY_CREATE}`,
          authorities: [RolesEnum.SUPER_ADMIN],
          click: () => this.closeSidenav(),
        },
      ],
    },
    {
      icon: 'pets',
      label: I18nMenuEnum.ANIMAL,
      authorities: [RolesEnum.COMMUNITY_USER],
      click: () => {
      },
      children: [
        {
          label: I18nMenuEnum.CREATE_ANIMAL_PROFILE,
          route: `${RoutesUrlsEnum.ANIMAL}${RoutesUrlsEnum.SLASH}${RoutesUrlsEnum.CREATE_ANIMAL_PROFILE}`,
          authorities: [RolesEnum.COMMUNITY_USER],
          click: () => this.closeSidenav(),
        },
        {
          label: I18nMenuEnum.VIEW_ANIMAL_RECORD,
          route: `${RoutesUrlsEnum.ANIMAL}${RoutesUrlsEnum.SLASH}${RoutesUrlsEnum.VIEW_ANIMAL_RECORD}`,
          authorities: [RolesEnum.COMMUNITY_USER],
          click: () => this.closeSidenav(),
        },
      ],
    },
    {
      icon: 'pets',
      label: I18nMenuEnum.ABANDONED_ANIMAL,
      authorities: [RolesEnum.CENSISTA_USER],
      click: () => {},
      children: [
        {
          label: I18nMenuEnum.CREATE_ABANDONED_ANIMAL,
          route: `${RoutesUrlsEnum.ABANDONED_ANIMAL}/${RoutesUrlsEnum.CREATE_ABANDONED_ANIMAL}`,
          authorities: [RolesEnum.CENSISTA_USER],
          click: () => this.closeSidenav(),
        },
        {
          label: I18nMenuEnum.VIEW_ABANDONED_ANIMAL_RECORD,
          route: `${RoutesUrlsEnum.ANIMAL}${RoutesUrlsEnum.SLASH}${RoutesUrlsEnum.VIEW_ABANDONED_ANIMAL_RECORD}`,
          authorities: [RolesEnum.COMMUNITY_USER],
          click: () => this.closeSidenav(),
        },
      ],
    },

    {
      icon: 'pets',
      label: I18nMenuEnum.COMMUNITY_CENSUS,
      authorities: [RolesEnum.CENSISTA_USER],
      click: () => {},
      children: [
        {
          label: I18nMenuEnum.REGISTER_COMMUNITY_ANIMAL,
          route: `${RoutesUrlsEnum.ANIMAL}/${RoutesUrlsEnum.REGISTER_COMMUNITY_ANIMAL_BY_CENSUS}`,
          authorities: [RolesEnum.CENSISTA_USER],
          click: () => this.closeSidenav(),
        },
      ],
    },

    {
      icon: 'view_in_ar',
      label: I18nMenuEnum.MODEL_3D,
      authorities: [
        RolesEnum.SUPER_ADMIN,
        RolesEnum.COMMUNITY_USER,
      ],
      click: () => {
      },
      children: [
        {
          label: I18nMenuEnum.VIEW_MODEL_3D,
          route: `${RoutesUrlsEnum.MODEL_3D}${RoutesUrlsEnum.SLASH}${RoutesUrlsEnum.MODEL_3D_LIST}`,
          authorities: [
            RolesEnum.SUPER_ADMIN,
            RolesEnum.COMMUNITY_USER,
          ],
          click: () => this.closeSidenav(),
        },
        {
          label: I18nMenuEnum.CREATE_MODEL_3D,
          route: `${RoutesUrlsEnum.MODEL_3D}/${RoutesUrlsEnum.MODEL_3D_CREATE}`,
          authorities: [
            RolesEnum.SUPER_ADMIN,
            RolesEnum.COMMUNITY_USER,
          ],
          click: () => this.closeSidenav(),
        },
      ],
    },
    {
  icon: 'medical_information',
  label: I18nMenuEnum.ANIMAL_DIAGNOSIS, 
  authorities: [
    RolesEnum.COMMUNITY_USER,
    RolesEnum.SUPER_ADMIN,
  ],
  click: () => {},
  children: [
    {
      label: I18nMenuEnum.VIEW_ANIMAL_DIAGNOSIS, 
      route: `${RoutesUrlsEnum.ANIMAL_DIAGNOSIS}${RoutesUrlsEnum.SLASH}${RoutesUrlsEnum.ANIMAL_DIAGNOSIS_LIST}`,
      authorities: [
        RolesEnum.COMMUNITY_USER,
        RolesEnum.SUPER_ADMIN,
      ],
      click: () => this.closeSidenav(),
    },
    {
      label: I18nMenuEnum.CREATE_ANIMAL_DIAGNOSIS,
      route: `${RoutesUrlsEnum.ANIMAL_DIAGNOSIS}/${RoutesUrlsEnum.ANIMAL_DIAGNOSIS_CREATE}`,
      authorities: [
        RolesEnum.COMMUNITY_USER,
        RolesEnum.SUPER_ADMIN,
      ],
      click: () => this.closeSidenav(),
    },
  ],
},
    {
      icon: 'notification_settings',
      label: I18nMenuEnum.NOTIFICATION_RULES,
      authorities: [RolesEnum.SUPER_ADMIN, RolesEnum.MUNICIPAL_ADMIN],
      click: () => this.closeSidenav(),
      route: `${RoutesUrlsEnum.NOTIFICATION_RULES}${RoutesUrlsEnum.SLASH}${RoutesUrlsEnum.NOTIFICATION_RULES_LIST}`,
    },
    {
      icon: 'breaking_news',
      label: I18nMenuEnum.ANNOUNCEMENTS,
      authorities: [RolesEnum.MUNICIPAL_ADMIN],
      click: () => this.closeSidenav(),
      children: [
        {
          label: I18nMenuEnum.ANNOUNCEMENT_LIST,
          route: `${RoutesUrlsEnum.ANNOUNCEMENTS}${RoutesUrlsEnum.SLASH}${RoutesUrlsEnum.ANNOUNCEMENTS_LIST}`,
          authorities: [RolesEnum.MUNICIPAL_ADMIN],
          click: () => this.closeSidenav(),
        },
        {
          label: I18nMenuEnum.ANNOUNCEMENT_CREATE,
          route: `${RoutesUrlsEnum.ANNOUNCEMENTS}${RoutesUrlsEnum.SLASH}${RoutesUrlsEnum.ANNOUNCEMENTS_CREATE}`,
          authorities: [RolesEnum.MUNICIPAL_ADMIN],
          click: () => this.closeSidenav(),
        }
      ],
    },
    {
      icon: 'report',
      label: I18nMenuEnum.COMPLAINTS,
      authorities: [RolesEnum.MUNICIPAL_ADMIN, RolesEnum.COMMUNITY_USER],
      click: () => this.closeSidenav(),
      children: [
        {
          label: I18nMenuEnum.COMPLAINT_LIST,
          route: `${RoutesUrlsEnum.COMPLAINTS}${RoutesUrlsEnum.SLASH}${RoutesUrlsEnum.COMPLAINTS_LIST}`,
          authorities: [RolesEnum.MUNICIPAL_ADMIN, RolesEnum.COMMUNITY_USER],
          click: () => this.closeSidenav(),
        },
        {
          label: I18nMenuEnum.COMPLAINT_CREATE,
          route: `${RoutesUrlsEnum.COMPLAINTS}${RoutesUrlsEnum.SLASH}${RoutesUrlsEnum.COMPLAINTS_CREATE}`,
          authorities: [RolesEnum.COMMUNITY_USER],
          click: () => this.closeSidenav(),
        }
      ],
    },
    {
      icon: 'logout',
      label: I18nMenuEnum.LOGOUT,
      route: RoutesUrlsEnum.VOID_ROUTE,
      click: () => this.authHttpService.logout(),
      authorities: [...this.allRoles()],
    }
  ]);

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
    const home = items.find((item) => item.route === RoutesUrlsEnum.HOME);
    const withChildren = items.filter(
      (item) => item !== home && item.children?.length
    );
    const withoutChildren = items.filter(
      (item) => item !== home && (!item.children || item.children.length === 0)
    );
    return [home, ...withChildren, ...withoutChildren].filter(Boolean);
  });

  constructor() {
    this.breakpointObserver
      .observe([`(max-width:${BreakpointsEnum.XL}px)`])
      .subscribe((result) => {
        if (result.matches) {
          this.sideNavMode.set('over');
          this.isScreenSmall.set(true);
        } else {
          this.sideNavMode.set('side');
          this.isScreenSmall.set(false);
        }
      });
  }

  /**
   * Returns the icon for a menu item.
   * @param item The menu item to get the icon for.
   * @author dgutierrez
   */
  getTabIndex(item: IMenuItem | IMenuItemChild | undefined): number {
    return item?.isDisabled ? -1 : 0;
  }

  /**
   * Checks if the current screen size is small.
   * @returns {boolean} True if the screen is small, false otherwise.
   * @author dgutierrez
   */
  private closeSidenav(): void {
    if (this.isScreenSmall()) {
      this.matSidenav()?.close();
    }
  }
}
