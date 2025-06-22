import {animate, style, transition, trigger} from '@angular/animations';

/**
 * Animación de fade out y deslizamiento hacia la izquierda
 * @author dgutierrez
 */
export const fadeOutLeft = trigger('fadeOutLeft', [
  transition(':leave', [
    animate('500ms ease-out', style({opacity: 0, transform: 'translateX(-100%)'}))
  ])
]);
