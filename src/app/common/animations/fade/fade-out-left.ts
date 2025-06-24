import {animate, style, transition, trigger} from '@angular/animations';

/**
 * Animation trigger for fading out and sliding an element to the left.
 *
 * This animation can be applied to Angular components or elements to smoothly
 * transition them out of view by reducing their opacity to zero and moving them
 * horizontally to the left by 100% of their width.
 *
 * @trigger fadeOutLeft
 * @animation
 * @param {void} :leave - Animation is triggered when the element leaves the DOM.
 * @returns {AnimationTriggerMetadata} The configured animation trigger.
 * @author dgutierrez
 */
export const fadeOutLeft = trigger('fadeOutLeft', [
  transition(':leave', [
    animate('500ms ease-out', style({opacity: 0, transform: 'translateX(-100%)'}))
  ])
]);
