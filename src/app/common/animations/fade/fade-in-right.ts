import {animate, style, transition, trigger} from '@angular/animations';

/**
 * Animación de fade in y deslizamiento hacia la derecha
 * @author dgutierrez
 */
export const fadeInRight = trigger('fadeInRight', [
  transition(':enter', [
    style({opacity: 0, transform: 'translateX(100%)'}),
    animate('500ms ease-in', style({opacity: 1, transform: 'translateX(0)'}))
  ])
]);
