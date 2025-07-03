import { Component } from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-rewards-system',
  imports: [
    MatFormFieldModule, MatInputModule, MatIconModule
  ],
  templateUrl: './rewards-system.page.html',
  styleUrl: './rewards-system.page.scss'
})
export class RewardsSystemPage {

}
