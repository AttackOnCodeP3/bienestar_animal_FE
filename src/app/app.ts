import {Component, effect, inject} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {Theme, Log} from '@services/general';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  private readonly log = inject(Log);
  readonly theme = inject(Theme);


  /**
   * Effect that watches for theme changes and applies the appropriate CSS classes to the body element.
   * It handles three theme modes:
   * - light: Forces light theme
   * - dark: Forces dark theme
   * - system: Uses the system preference (dark or light)
   * @author dgutierrez
   */
  readonly themeEffect = effect(() => {
    this.log.debug({
      message: 'Theme effect triggered',
      data: { theme: this.theme.appTheme() },
    });
    const theme = this.theme.appTheme();
    this.theme.applyTheme(theme);
  });
}
