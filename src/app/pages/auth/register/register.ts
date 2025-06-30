import { ChangeDetectionStrategy, Component } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LogoBienestarAnimal} from '@components/icons';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatDivider} from '@angular/material/divider';
import {MatInput, MatLabel} from '@angular/material/input';
import {TranslatePipe} from '@ngx-translate/core';

@Component({
  selector: 'app-register',
  imports: [
    FormsModule,
    LogoBienestarAnimal,
    MatButton,
    MatDivider,
    MatError,
    MatFormField,
    MatIcon,
    MatIconButton,
    MatInput,
    MatLabel,
    MatTooltip,
    ReactiveFormsModule,
    TranslatePipe
  ],
  templateUrl: './register.html',
  styleUrl: './register.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Register {

}
