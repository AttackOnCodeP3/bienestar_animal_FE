import { Component, input, computed } from '@angular/core';
import { GoogleMapsModule } from '@angular/google-maps';

/**
 * GoogleMapsComponent displays a Google Map centered at the provided latitude and longitude,
 * with a marker at the center position.
 *
 * @author @aBlancoC
 *
 * @component
 * @example
 * <app-google-maps [lat]="9.9333" [lng]="-84.0833"></app-google-maps>
 *
 * @property {number} lat - The latitude for the map center and marker position.
 * @property {number} lng - The longitude for the map center and marker position.
 * @property {object} markerOptions - Options for customizing the map marker.
 * @method center - Computes the center position for the map and marker.
 */
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
