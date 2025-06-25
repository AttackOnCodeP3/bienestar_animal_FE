import {animate, state, style, transition, trigger} from '@angular/animations';

/**
 * Animation trigger for sliding elements horizontally.
 *
 * This animation defines two states:
 * - `in`: Element is in its original position (translateX(0%)).
 * - `out`: Element is translated out of view (translateX(100%) for right, translateX(-100%) for left).
 *
 * Transitions:
 * - `in` to `out`: Slides the element out over 200ms with an ease-in effect.
 * - `out` to `in`: Slides the element back in over 200ms with an ease-in effect.
 *
 * @type {AnimationTriggerMetadata}
 * @author dgutierrez
 */
export const slideRightAnimation = trigger('slideRight', [
  state('in', style({transform: 'translateX(0%)'})),
  state('out', style({transform: 'translateX(100%)'})),
  transition('in <=> out', animate('200ms ease-in')),
]);


/**
 * Animation trigger for sliding elements horizontally to the left.
 *
 * This animation defines two states:
 * - `in`: Element is in its original position (translateX(0%)).
 * - `out`: Element is translated out of view to the left (translateX(-100%)).
 *
 * Transitions:
 * - `in` to `out`: Slides the element out to the left over 200ms with an ease-in effect.
 * - `out` to `in`: Slides the element back in from the left over 200ms with an ease-in effect.
 *
 * @type {AnimationTriggerMetadata}
 * @author dgutierrez
 */
export const slideLeftAnimation = trigger('slideLeft', [
  state('in', style({transform: 'translateX(0%)'})),
  state('out', style({transform: 'translateX(-100%)'})),
  transition('in <=> out', animate('200ms ease-in')),
]);
