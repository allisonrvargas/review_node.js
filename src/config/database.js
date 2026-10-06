import { createConnection } from 'mysql2/promise';

// Se pueden sobreescribir con variables de entorno (DB_HOST, DB_USER, DB_PASSWORD, DB_NAME)
const settings = {
    host: process.env.DB_HOST ?? 'localhost',
    user: process.env.DB_USER ?? 'root',
    password: process.env.DB_PASSWORD ?? 'tu_password',
    database: process.env.DB_NAME ?? 'campus',
    // las columnas DATETIME llegan como texto 'YYYY-MM-DD HH:mm:ss' (más fácil de mostrar en HTML)
    dateStrings: true
};

export async function connectToDatabase() {
    const connection = await createConnection(settings);
    console.log(`Conectado a la base de datos "${settings.database}" en ${settings.host}.\n`);
    return connection;
}
