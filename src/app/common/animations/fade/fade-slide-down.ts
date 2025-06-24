import {animate, style, transition, trigger} from '@angular/animations';

/**
 * Animation trigger for sliding an element down with a fade-in effect on enter,
 * and sliding it up with a fade-out effect on leave.
 *
 * - On enter: The element starts fully transparent and translated upward,
 *   then animates to full opacity and its original position.
 * - On leave: The element animates back to being fully transparent and translated upward.
 *
 * Useful for dropdowns, modals, or any UI element that should appear/disappear smoothly.
 *
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
