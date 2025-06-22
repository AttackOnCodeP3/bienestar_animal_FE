import {animate, style, transition, trigger} from '@angular/animations';

/**
 * Animación de desplazamiento hacia abajo y fade in, y desplazamiento hacia arriba y fade out
 * @author dgutierrez
 */
export const slideDownFadeAnimation = trigger('slideDownFade', [
  transition(':enter', [
    style({ opacity: 0, transform: 'translateY(-100%)' }),
    animate('300ms ease-in', style({ opacity: 1, transform: 'translateY(0)' }))
  ]),
  transition(':leave', [
    animate('300ms ease-out', style({ opacity: 0, transform: 'translateY(-100%)' })) 
  ])
]);
