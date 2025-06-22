import { animate, state, style, transition, trigger } from '@angular/animations'

/**
 * Animación de deslizamiento de contenido
 * @author dgutierrez
 */
export const slideContent = trigger('slideContent', [
    state('up', style({ 'margin-top': '0' })),
    state('down', style({ 'margin-top': 'var(--ion-header-height)' })),
    transition('up => down', animate('300ms ease-in')),
    transition('down => up', animate('300ms ease-out')),
])
