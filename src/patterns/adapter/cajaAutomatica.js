/**
 * ADAPTEE #2: caja automática (modos P-R-N-D).
 * Ella sola decide la marcha según la velocidad; solo recibe presiones
 * de acelerador y freno. También tiene una API distinta al Target.
 */
export class CajaAutomatica {
    // [velocidad mínima km/h, marcha] -> la caja busca el tramo correspondiente
    static TABLA_CAMBIOS = [[0, 1], [20, 2], [40, 3], [65, 4], [90, 5]];

    #modo = 'P'; // P = parqueo, R = reversa, N = neutral, D = drive
    #velocidad = 0;

    get modo() {
        return this.#modo;
    }

    get velocidadKmh() {
        return this.#velocidad;
    }

    get marchaActual() {
        if (this.#modo !== 'D') return 0;
        let marcha = 1;
        for (const [minimo, m] of CajaAutomatica.TABLA_CAMBIOS) {
            if (this.#velocidad >= minimo) marcha = m;
        }
        return marcha;
    }

    cambiarModo(modo) {
        if (modo === 'P' && this.#velocidad > 0) {
            console.log('   [Caja automática] No se puede estacionar (P) con el carro en movimiento.');
            return false;
        }
        this.#modo = modo;
        console.log(`   [Caja automática] Modo ${modo}.`);
        return true;
    }

    presionarAcelerador(intensidad = 15) {
        if (this.#modo !== 'D') {
            console.log(`   [Caja automática] En modo ${this.#modo} el carro no avanza.`);
            return;
        }
        const anterior = this.marchaActual;
        this.#velocidad = Math.min(this.#velocidad + intensidad, 120);
        if (this.marchaActual !== anterior) {
            console.log(`   [Caja automática] Cambio automático: ${anterior} -> ${this.marchaActual}.`);
        }
    }

    presionarFreno(intensidad = 15) {
        const anterior = this.marchaActual;
        this.#velocidad = Math.max(this.#velocidad - intensidad, 0);
        if (this.#modo === 'D' && this.marchaActual !== anterior) {
            console.log(`   [Caja automática] Reducción automática: ${anterior} -> ${this.marchaActual}.`);
        }
    }
}
