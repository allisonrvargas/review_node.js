/**
 * ADAPTEE #1: caja mecánica (palanca + embrague).
 * Tiene su propia API, incompatible con SelectorVelocidades.
 */
export class CajaManual {
    static VELOCIDAD_POR_MARCHA = [0, 20, 40, 60, 85, 110]; // km/h aproximados (0 = neutral)
    static MAX_MARCHA = 5;

    #embragueOprimido = false;
    #marcha = 0;

    get marcha() {
        return this.#marcha;
    }

    get velocidadKmh() {
        return CajaManual.VELOCIDAD_POR_MARCHA[this.#marcha];
    }

    oprimirEmbrague() {
        this.#embragueOprimido = true;
        console.log('   [Caja manual] Pisando el embrague...');
    }

    soltarEmbrague() {
        this.#embragueOprimido = false;
        console.log('   [Caja manual] Soltando el embrague...');
    }

    // marcha: 0 = neutral, 1..5 = marchas hacia adelante
    meterMarcha(marcha) {
        if (!this.#embragueOprimido) {
            console.log('   [Caja manual] ¡CRRRRK! No se puede cambiar sin pisar el embrague.');
            return false;
        }
        if (marcha < 0 || marcha > CajaManual.MAX_MARCHA) {
            console.log(`   [Caja manual] La marcha ${marcha} no existe.`);
            return false;
        }
        this.#marcha = marcha;
        console.log(`   [Caja manual] Palanca en ${marcha === 0 ? 'neutral' : `marcha ${marcha}`}.`);
        return true;
    }
}
