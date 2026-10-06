import { askOption, printHeader, pause } from './console.js';
import { Carro } from '../patterns/adapter/carro.js';
import { SelectorManualAdapter } from '../patterns/adapter/manualAdapter.js';
import { SelectorAutomaticoAdapter } from '../patterns/adapter/automaticAdapter.js';

const TITLE = 'CARRO - PATRÓN ADAPTER';

export async function carMenu(rl) {
    const kind = await askOption(TITLE, ['Carro con caja MANUAL', 'Carro con caja AUTOMÁTICA'], rl, 'Regresar');

    let carro;
    if (kind === '1') carro = new Carro('Toyota Hilux', new SelectorManualAdapter());
    else if (kind === '2') carro = new Carro('Tesla Model 3', new SelectorAutomaticoAdapter());
    else return;

    // Desde aquí el código es idéntico sin importar qué caja tenga el carro.
    while (true) {
        const opt = await askOption(`${TITLE} - ${carro.marca}`,
            ['Encender', 'Acelerar (subir velocidad)', 'Frenar (bajar velocidad)', 'Ver estado', 'Apagar'],
            rl, 'Regresar');

        if (opt === '0') return;

        printHeader(TITLE, carro.marca);
        switch (opt) {
            case '1': carro.encender(); break;
            case '2': carro.acelerar(); break;
            case '3': carro.frenar(); break;
            case '4': break;
            case '5': carro.apagar(); break;
            default: console.log('Opción inválida.');
        }
        carro.mostrarEstado();
        await pause(rl);
    }
}
