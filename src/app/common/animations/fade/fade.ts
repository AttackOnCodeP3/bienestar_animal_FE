import { animate, style, transition, trigger } from '@angular/animations'

/**
 * Defines a reusable fade animation trigger for Angular components.
 *
 * This animation smoothly transitions a component's opacity when it enters or leaves the DOM.
 * - On enter: fades in from transparent to fully visible.
 * - On leave: fades out from fully visible to transparent.
 *
 * Usage:
 * Attach the `@fade` trigger to a component or element to animate its appearance and disappearance.
 *
 * @see https://angular.io/guide/animations
 * @author dgutierrez
 */
export const fade = trigger('fade', [
    transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms ease-in', style({ opacity: 1 })),
    ]),
    transition(':leave', [animate('300ms ease-out', style({ opacity: 0 }))]),
])
