import { test, beforeEach, afterEach, mock } from 'node:test';
import assert from 'node:assert/strict';

import { SelectorManualAdapter } from '../src/patterns/adapter/manualAdapter.js';
import { SelectorAutomaticoAdapter } from '../src/patterns/adapter/automaticAdapter.js';
import { SelectorVelocidades } from '../src/patterns/adapter/selectorVelocidades.js';
import { CajaManual } from '../src/patterns/adapter/cajaManual.js';
import { CajaAutomatica } from '../src/patterns/adapter/cajaAutomatica.js';
import { Carro } from '../src/patterns/adapter/carro.js';

// Las cajas escriben mensajes con console.log; se silencian para que la salida de las pruebas sea limpia
beforeEach(() => mock.method(console, 'log', () => {}));
afterEach(() => mock.restoreAll());

test('la caja manual no deja cambiar de marcha sin pisar el embrague', () => {
    const caja = new CajaManual();
    assert.equal(caja.meterMarcha(1), false);
    assert.equal(caja.marcha, 0);
    caja.oprimirEmbrague();
    assert.equal(caja.meterMarcha(1), true);
    assert.equal(caja.marcha, 1);
    assert.equal(caja.meterMarcha(9), false);
});

test('el adapter manual cumple el contrato: iniciar, subir, bajar y detener', () => {
    const selector = new SelectorManualAdapter();
    assert.ok(selector instanceof SelectorVelocidades);

    selector.iniciar();
    assert.deepEqual(selector.estado(), { tipo: 'Manual', marcha: '1', velocidad: 20 });
    selector.subirVelocidad();
    assert.deepEqual(selector.estado(), { tipo: 'Manual', marcha: '2', velocidad: 40 });
    selector.bajarVelocidad();
    assert.equal(selector.estado().marcha, '1');
    selector.bajarVelocidad(); // ya está en la marcha más baja
    assert.equal(selector.estado().marcha, '1');
    selector.detener();
    assert.deepEqual(selector.estado(), { tipo: 'Manual', marcha: 'N', velocidad: 0 });
});

test('el adapter manual no pasa de la quinta marcha', () => {
    const selector = new SelectorManualAdapter();
    selector.iniciar();
    for (let i = 0; i < 10; i++) selector.subirVelocidad();
    assert.equal(selector.estado().marcha, '5');
    assert.equal(selector.estado().velocidad, 110);
});

test('la caja automática no avanza fuera del modo D ni se estaciona en movimiento', () => {
    const caja = new CajaAutomatica();
    caja.presionarAcelerador();
    assert.equal(caja.velocidadKmh, 0);
    caja.cambiarModo('D');
    caja.presionarAcelerador();
    assert.equal(caja.velocidadKmh, 15);
    assert.equal(caja.cambiarModo('P'), false);
    assert.equal(caja.modo, 'D');
});

test('el adapter automático cambia de marcha solo según la velocidad', () => {
    const selector = new SelectorAutomaticoAdapter();
    assert.ok(selector instanceof SelectorVelocidades);

    selector.iniciar();
    selector.subirVelocidad(); // 15 km/h
    assert.deepEqual(selector.estado(), { tipo: 'Automático', marcha: '1', velocidad: 15 });
    selector.subirVelocidad(); // 30 km/h
    assert.equal(selector.estado().marcha, '2');
    selector.subirVelocidad();
    selector.subirVelocidad(); // 60 km/h
    assert.equal(selector.estado().marcha, '3');
    selector.bajarVelocidad();
    assert.equal(selector.estado().velocidad, 45);
});

test('el adapter automático se detiene y queda en P', () => {
    const selector = new SelectorAutomaticoAdapter();
    selector.iniciar();
    for (let i = 0; i < 6; i++) selector.subirVelocidad();
    selector.detener();
    assert.deepEqual(selector.estado(), { tipo: 'Automático', marcha: 'P', velocidad: 0 });
});

test('el carro solo acepta un SelectorVelocidades', () => {
    assert.throws(() => new Carro('Toyota', {}), /SelectorVelocidades/);
});

test('el carro no acelera hasta que se enciende y funciona igual con cualquier caja', () => {
    for (const selector of [new SelectorManualAdapter(), new SelectorAutomaticoAdapter()]) {
        const carro = new Carro('Mazda', selector);
        carro.acelerar();
        assert.equal(selector.estado().velocidad, 0);
        carro.encender();
        carro.acelerar();
        assert.ok(selector.estado().velocidad > 0);
        carro.apagar();
        assert.equal(selector.estado().velocidad, 0);
    }
});