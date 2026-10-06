import { createInterface } from 'readline/promises';
import { connectToDatabase } from './src/config/database.js';
import { askOption, pause } from './src/ui/console.js';
import { carMenu } from './src/ui/carMenu.js';
import { reportMenu } from './src/ui/reportMenu.js';

const rl = createInterface({ input: process.stdin, output: process.stdout });

const MAIN_OPTIONS = [
    'Carro (patrón Adapter)',
    'Reportes HTML del campus'
];

async function main() {
    let connection;
    try {
        while (true) {
            const opt = await askOption('SISTEMA CAMPUS', MAIN_OPTIONS, rl);

            if (opt === '0') break;

            if (opt === '1') {
                await carMenu(rl);   // no necesita base de datos
            }
            else if (opt === '2') {
                // la conexión se abre solo la primera vez que se necesita
                connection ??= await connectToDatabase();
                await reportMenu(connection, rl);
            }
            else {
                console.log('\nOpción inválida. Intente de nuevo.');
                await pause(rl);
            }
        }
    }
    catch (err) {
        console.error('Error al iniciar la app o conectarse a la base de datos.');
        console.error(err.message);
    }
    finally {
        rl.close();
        if (connection) await connection.end();
    }
}

main();
