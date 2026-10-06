import { SelectorVelocidades } from './selectorVelocidades.js';
import { CajaAutomatica } from './cajaAutomatica.js';

/**
 * ADAPTER: traduce el contrato SelectorVelocidades a las operaciones
 * de una caja automática (modos + acelerador/freno).
 */
export class SelectorAutomaticoAdapter extends SelectorVelocidades {
    #caja;

    constructor(caja = new CajaAutomatica()) {
        super();
        this.#caja = caja;
    }

    iniciar() {
        this.#caja.cambiarModo('D');
    }

    subirVelocidad() {
        this.#caja.presionarAcelerador();
    }

    bajarVelocidad() {
        this.#caja.presionarFreno();
    }

    detener() {
        // frena hasta parar y luego estaciona
        while (this.#caja.velocidadKmh > 0) this.#caja.presionarFreno(30);
        this.#caja.cambiarModo('P');
    }

    estado() {
        return {
            tipo: 'Automático',
            marcha: this.#caja.modo === 'D' ? String(this.#caja.marchaActual) : this.#caja.modo,
            velocidad: this.#caja.velocidadKmh
        };
    }
}
