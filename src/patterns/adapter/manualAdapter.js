import { SelectorVelocidades } from './selectorVelocidades.js';
import { CajaManual } from './cajaManual.js';

/**
 * ADAPTER: traduce el contrato SelectorVelocidades a las operaciones
 * de una caja manual (embrague + palanca).
 */
export class SelectorManualAdapter extends SelectorVelocidades {
    #caja;

    constructor(caja = new CajaManual()) {
        super();
        this.#caja = caja;
    }

    iniciar() {
        // para arrancar, un conductor de manual mete primera con el embrague pisado
        this.#caja.oprimirEmbrague();
        this.#caja.meterMarcha(1);
        this.#caja.soltarEmbrague();
    }

    subirVelocidad() {
        if (this.#caja.marcha >= CajaManual.MAX_MARCHA) {
            console.log('   Ya está en la última marcha.');
            return;
        }
        this.#caja.oprimirEmbrague();
        this.#caja.meterMarcha(this.#caja.marcha + 1);
        this.#caja.soltarEmbrague();
    }

    bajarVelocidad() {
        if (this.#caja.marcha <= 1) {
            console.log('   Ya está en la marcha más baja.');
            return;
        }
        this.#caja.oprimirEmbrague();
        this.#caja.meterMarcha(this.#caja.marcha - 1);
        this.#caja.soltarEmbrague();
    }

    detener() {
        this.#caja.oprimirEmbrague();
        this.#caja.meterMarcha(0);
        this.#caja.soltarEmbrague();
    }

    estado() {
        return {
            tipo: 'Manual',
            marcha: this.#caja.marcha === 0 ? 'N' : String(this.#caja.marcha),
            velocidad: this.#caja.velocidadKmh
        };
    }
}
