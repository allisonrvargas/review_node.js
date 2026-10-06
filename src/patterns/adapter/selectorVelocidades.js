/**
 * TARGET del patrón Adapter.
 * Es la única interfaz que conoce el Carro. Cualquier caja de cambios
 * (manual, automática, o una futura) debe adaptarse a este contrato.
 */
export class SelectorVelocidades {
    iniciar() {
        throw new Error('Debe implementar el método iniciar().');
    }

    subirVelocidad() {
        throw new Error('Debe implementar el método subirVelocidad().');
    }

    bajarVelocidad() {
        throw new Error('Debe implementar el método bajarVelocidad().');
    }

    detener() {
        throw new Error('Debe implementar el método detener().');
    }

    // Debe devolver { tipo, marcha, velocidad }
    estado() {
        throw new Error('Debe implementar el método estado().');
    }
}
