import {animate, state, style, transition, trigger} from '@angular/animations';

export const slideRightAnimation = trigger('slideRight', [
  state('in', style({transform: 'translateX(0%)'})),
  state('out', style({transform: 'translateX(100%)'})),
  transition('in <=> out', animate('200ms ease-in')),
]);

export const slideLeftAnimation = trigger('slideLeft', [
  state('in', style({transform: 'translateX(0%)'})),
  state('out', style({transform: 'translateX(-100%)'})),
  transition('in <=> out', animate('200ms ease-in')),
]);
