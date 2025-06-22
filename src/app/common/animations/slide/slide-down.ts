import { animate, style, transition, trigger } from '@angular/animations'

/**
 * Animación de desplazamiento hacia abajo
 * @author dgutierrez
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
