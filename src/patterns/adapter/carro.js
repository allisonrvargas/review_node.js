import { SelectorVelocidades } from './selectorVelocidades.js';

/**
 * CLIENTE: el carro solo depende de la abstracción SelectorVelocidades.
 * No sabe (ni le importa) si por dentro hay una caja manual o automática.
 */
export class Carro {
    #selector;
    #encendido = false;

    constructor(marca, selector) {
        if (!(selector instanceof SelectorVelocidades)) {
            throw new Error('El selector debe ser un SelectorVelocidades.');
        }
        this.marca = marca;
        this.#selector = selector;
    }

    encender() {
        if (this.#encendido) return console.log('El carro ya está encendido.');
        this.#encendido = true;
        console.log(`Encendiendo ${this.marca}...`);
        this.#selector.iniciar();
    }

    acelerar() {
        if (!this.#validarEncendido()) return;
        console.log('Acelerando...');
        this.#selector.subirVelocidad();
    }

    frenar() {
        if (!this.#validarEncendido()) return;
        console.log('Frenando...');
        this.#selector.bajarVelocidad();
    }

    apagar() {
        if (!this.#validarEncendido()) return;
        console.log(`Apagando ${this.marca}...`);
        this.#selector.detener();
        this.#encendido = false;
    }

    mostrarEstado() {
        const { tipo, marcha, velocidad } = this.#selector.estado();
        console.log(`\n${this.marca} | Caja: ${tipo} | Marcha: ${marcha} | Velocidad: ${velocidad} km/h | ${this.#encendido ? 'Encendido' : 'Apagado'}`);
    }

    #validarEncendido() {
        if (!this.#encendido) console.log('Primero debe encender el carro.');
        return this.#encendido;
    }
}
