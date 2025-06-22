import {animate, style, transition, trigger} from '@angular/animations';

const transitionDuration = '500ms';
const translateX = `translateX(-25%)`;
/**
 * Animación de fade in y deslizamiento hacia la izquierda y fade out y deslizamiento hacia la izquierda
 * @author dgutierrez
 */
export const fadeInLeftOutLeft = trigger('fadeInLeftOutLeft', [
  transition(':enter', [
    style({opacity: 0, transform: `${translateX}`}),
    animate(`${transitionDuration} ease-in`, style({opacity: 1, transform: 'translateX(0)'}))
  ]),
  transition(':leave', [
    animate(`${transitionDuration} ease-out`, style({opacity: 0, transform: `${translateX}`}))
  ])
]);
