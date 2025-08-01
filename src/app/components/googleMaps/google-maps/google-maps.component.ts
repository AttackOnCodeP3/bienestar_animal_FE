import { Component, Input, signal } from '@angular/core';
import { GoogleMapsModule } from '@angular/google-maps';

@Component({
  selector: 'app-google-maps',
  standalone: true,
  imports: [GoogleMapsModule],
  template: `
    <google-map
      [height]="'400px'"
      [width]="'100%'"
      [center]="center()"
      [zoom]="15"
    >
      <map-marker
        [position]="center()"
        [options]="markerOptions"
      ></map-marker>
    </google-map>
  `,
  styles: [`
    google-map {
      display: block;
    }
  `]
})
export class GoogleMapsComponent {
  @Input({ required: true }) lat!: number;
  @Input({ required: true }) lng!: number;

  center = signal({ lat: this.lat, lng: this.lng });

  markerOptions = {
    icon: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png'
  };

  ngOnChanges() {
    this.center.set({ lat: this.lat, lng: this.lng });
  }
}