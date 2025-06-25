import { animate, state, style, transition, trigger } from '@angular/animations'

/**
 * Animation trigger for sliding content vertically.
 *
 * This animation defines two states:
 * - `up`: Content is positioned at the top with no margin.
 * - `down`: Content is pushed down by the height of the header.
 *
 * Transitions:
 * - `up` to `down`: Slides the content down over 300ms with an ease-in effect.
 * - `down` to `up`: Slides the content up over 300ms with an ease-out effect.
 *
 * @constant
 * @type {AnimationTriggerMetadata}
 * @author dgutierrez
 */
export const slideContent = trigger('slideContent', [
    state('up', style({ 'margin-top': '0' })),
    state('down', style({ 'margin-top': 'var(--ion-header-height)' })),
    transition('up => down', animate('300ms ease-in')),
    transition('down => up', animate('300ms ease-out')),
])
