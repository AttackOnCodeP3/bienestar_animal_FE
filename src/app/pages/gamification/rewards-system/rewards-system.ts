import { Component } from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-rewards-system',
  imports: [
    MatFormFieldModule, MatInputModule, MatIconModule, MatButton
  ],
  templateUrl: './rewards-system.html',
  styleUrl: './rewards-system.scss'
})
export class RewardsSystem {

}
