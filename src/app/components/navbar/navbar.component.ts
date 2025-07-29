import {Component, inject, input, OnInit} from '@angular/core';

import {MatIconButton} from '@angular/material/button';
import {MatMenu, MatMenuItem, MatMenuTrigger} from '@angular/material/menu';
import {MatBadge} from '@angular/material/badge';
import {MatToolbar, MatToolbarRow} from '@angular/material/toolbar';
import {MatIcon} from '@angular/material/icon';

import {TranslatePipe} from '@ngx-translate/core';

import {MatSidenav} from '@angular/material/sidenav';
import {Constants} from '@common/constants/constants';

import {I18nService, ThemeService} from '@services/general';
import {AuthHttpService, NotificationHttpService} from '@services/http';
import {ModalService} from '@services/modals';

@Component({
  selector: 'app-navbar',
  imports: [
    MatBadge,
    MatIcon,
    MatIconButton,
    MatMenu,
    MatMenuItem,
    MatMenuTrigger,
    MatToolbar,
    MatToolbarRow,
    TranslatePipe,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
  changeDetection: Constants.changeDetectionStrategy
})
export class NavbarComponent implements OnInit {
  readonly modalService = inject(ModalService);

  readonly showMenuToggle = input<boolean>(true)
  readonly matSidenav = input<MatSidenav>();
  readonly authHttpService = inject(AuthHttpService);
  readonly notificationHttpService = inject(NotificationHttpService);

  readonly theme = inject(ThemeService)
  readonly i18n = inject(I18nService);

  ngOnInit() {
    if (this.authHttpService.isAuthenticated()) {
      this.notificationHttpService.countMyUnreadNotifications()
    }
  }

  openNotificationsModal() {
    this.notificationHttpService.markAllMyNotificationsAsRead();
    this.modalService.openNotificationsModal();
  }
}
