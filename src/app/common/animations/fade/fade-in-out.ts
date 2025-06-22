import {animate, state, style, transition, trigger} from '@angular/animations';

/**
 * Animación de fade in y fade out
 * @author dgutierrez
 */
export const fadeInOut = trigger('fadeInOut', [
  state('void', style({opacity: 0})),
  transition(':enter', [
    style({opacity: 0}),
    animate('500ms ease-in', style({opacity: 1}))
  ]),
  transition(':leave', [
    animate('500ms ease-out', style({opacity: 0}))
  ])
]);
