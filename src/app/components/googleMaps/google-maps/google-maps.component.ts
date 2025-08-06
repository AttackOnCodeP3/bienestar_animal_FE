import { Component, input, computed } from '@angular/core';
import { GoogleMapsModule } from '@angular/google-maps';

@Component({
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


  lat = input.required<number>();
  lng = input.required<number>();


  center = computed(() => ({
    lat: this.lat(),
    lng: this.lng()
  }));

  markerOptions = {
    icon: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png'
  };
}
