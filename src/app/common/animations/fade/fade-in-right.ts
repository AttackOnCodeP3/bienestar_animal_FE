import {animate, style, transition, trigger} from '@angular/animations';

/**
 * Animation trigger for a fade-in effect combined with a slide-in from the right.
 * When an element enters the DOM, it starts fully transparent and positioned 100% to the right,
 * then animates to full opacity and its original position.
 * Useful for animating the appearance of components or elements in Angular applications.
 * @author dgutierrez
 */
export const fadeInRight = trigger('fadeInRight', [
  transition(':enter', [
    style({opacity: 0, transform: 'translateX(100%)'}),
    animate('500ms ease-in', style({opacity: 1, transform: 'translateX(0)'}))
  ])
]);
