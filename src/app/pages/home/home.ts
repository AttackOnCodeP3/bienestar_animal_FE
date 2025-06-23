import { Component } from '@angular/core';
import {LogoBienestarAnimal} from '@components/icons/logo-bienestar-animal/logo-bienestar-animal';

@Component({
  selector: 'app-home',
  imports: [
    LogoBienestarAnimal
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {

}
