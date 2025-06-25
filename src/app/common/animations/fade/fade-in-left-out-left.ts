import {animate, style, transition, trigger} from '@angular/animations';

const transitionDuration = '500ms';
const translateX = `translateX(-25%)`;

/**
 * Animation trigger for fading in and sliding an element from the left on enter,
 * and fading out while sliding to the left on leave.
 *
 * - On enter: The element starts with 0 opacity and is translated -25% on the X axis,
 *   then animates to full opacity and its original position.
 * - On leave: The element animates back to 0 opacity and -25% X translation.
 *
 * Useful for animating components or elements that should appear/disappear with a leftward motion.
 *
 * @constant
 * @type {AnimationTriggerMetadata}
 * @see https://angular.io/api/animations/trigger
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
