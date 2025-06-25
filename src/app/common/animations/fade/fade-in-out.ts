import {animate, state, style, transition, trigger} from '@angular/animations';

/**
 * Animation trigger for fading elements in and out.
 *
 * This Angular animation can be attached to elements to smoothly transition
 * their opacity when they are added to or removed from the DOM.
 *
 * - On enter: Fades in from opacity 0 to 1 over 500ms with an ease-in curve.
 * - On leave: Fades out from opacity 1 to 0 over 500ms with an ease-out curve.
 *
 * @constant
 * @type {AnimationTriggerMetadata}
 * @see https://angular.io/api/animations/trigger
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
