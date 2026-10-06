# REVIEW

Proyecto Node.js (ES modules) con `mysql2`.

## Ejecutar
1. `npm install`
2. (Opcional) crear la BD: `mysql -u root -p < sql/schema.sql` y datos de prueba: `mysql -u root -p < sql/seed.sql`
3. Configurar la contraseña en `src/config/database.js` o con variables de entorno
   (`DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`).
4. `npm start`

## Estructura
```
app.js                               menú principal
src/config/database.js               conexión a MySQL
src/ui/                              menús de consola (principal, carro, reportes)
src/patterns/adapter/
    selectorVelocidades.js           TARGET   (interfaz que usa el carro)
    cajaManual.js / cajaAutomatica.js  ADAPTEES (APIs incompatibles)
    manualAdapter.js / automaticAdapter.js  ADAPTERS
    carro.js                         CLIENTE
src/repositories/campusRepository.js consultas SQL
src/reports/                         generación de HTML
reportes/                            aquí se guardan los .html generados
```

## Reportes (carpeta `reportes/`)
estudiantes.html, profesores.html, horarios_<curso>.html,
estudiantes_<curso>.html, temas_<curso>.html
