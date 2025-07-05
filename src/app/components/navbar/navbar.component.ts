import {Component, inject, input} from '@angular/core';
import {MatIconButton} from '@angular/material/button';
import {MatMenu, MatMenuItem, MatMenuTrigger} from '@angular/material/menu';
import {MatToolbar, MatToolbarRow} from '@angular/material/toolbar';
import {MatIcon} from '@angular/material/icon';
import {TranslatePipe} from '@ngx-translate/core';
import {MatSidenav} from '@angular/material/sidenav';
import {Constants} from '@common/constants/constants';
import {I18nService, ThemeService} from '@services/general';

@Component({
  selector: 'app-navbar',
  imports: [
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
export class NavbarComponent {
  readonly showMenuToggle = input<boolean>(true)
  readonly matSidenav = input<MatSidenav>();

  readonly theme = inject(ThemeService)
  readonly i18n = inject(I18nService);
}
