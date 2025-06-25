import { animate, style, transition, trigger } from '@angular/animations'

/**
 * Animation trigger for sliding an element down from above.
 *
 * This Angular animation moves the element from above the viewport
 * (using the CSS variable `--ion-header-height` to determine the offset)
 * into its natural position when entering, and slides it back up when leaving.
 *
 * @author dgutierrez
 * @see https://angular.io/api/animations/trigger
 */
export const slideDown = trigger('slideDown', [
    transition(':enter', [
        style({ transform: 'translateY(calc(-1 * var(--ion-header-height)))' }),
        animate('300ms ease-in', style({ transform: 'translateY(0)' })),
    ]),
    transition(':leave', [
        animate(
            '300ms ease-out',
            style({
                transform: 'translateY(calc(-1 * var(--ion-header-height)))',
            })
        ),
    ]),
])
