import { Component } from '@angular/core';
import { MatIconModule } from "@angular/material/icon";
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  imports: [
    MatIconModule, 
    RouterModule

  ]
})
export class FooterComponent {
  currentYear: number = new Date().getFullYear();
}