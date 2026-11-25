import { test } from 'node:test';
import assert from 'node:assert/strict';

import { escapeHtml, formats, renderReport } from '../src/reports/htmlRenderer.js';

const columnas = [
    { key: 'code', label: 'Código' },
    { key: 'fullName', label: 'Nombre' },
    { key: 'birthdate', label: 'Nacimiento', format: formats.date }
];

test('escapeHtml neutraliza etiquetas y comillas', () => {
    assert.equal(escapeHtml('<b>"a" & \'b\'</b>'), '&lt;b&gt;&quot;a&quot; &amp; &#39;b&#39;&lt;/b&gt;');
    assert.equal(escapeHtml(null), '');
    assert.equal(escapeHtml(undefined), '');
});

test('el reporte muestra las filas, los encabezados y la fecha recortada', () => {
    const html = renderReport({
        title: 'Estudiantes',
        subtitle: 'Campus',
        columns: columnas,
        rows: [{ code: 'E-01', fullName: 'Ana Pérez', birthdate: '2004-05-17T00:00:00.000Z' }]
    });
    assert.match(html, /<title>Estudiantes<\/title>/);
    assert.match(html, /<th>Código<\/th>/);
    assert.match(html, /<td>E-01<\/td>/);
    assert.match(html, /<td>Ana Pérez<\/td>/);
    assert.match(html, /<td>2004-05-17<\/td>/);
});

test('el reporte escapa datos peligrosos que vienen de la base de datos', () => {
    const html = renderReport({
        title: 'Prueba',
        columns: columnas,
        rows: [{ code: 'X', fullName: '<script>alert(1)</script>', birthdate: null }]
    });
    assert.ok(!html.includes('<script>alert(1)</script>'));
    assert.match(html, /&lt;script&gt;alert\(1\)&lt;\/script&gt;/);
});

test('sin filas muestra el mensaje de registros vacíos con el colspan correcto', () => {
    const html = renderReport({ title: 'Vacío', columns: columnas, rows: [] });
    assert.match(html, /No hay registros para mostrar\./);
    assert.match(html, /colspan="3"/);
});

test('los valores vacíos se muestran con un guion y el formato activo distingue estados', () => {
    const html = renderReport({
        title: 'Estados',
        columns: [{ key: 'city', label: 'Ciudad' }, { key: 'active', label: 'Estado', format: formats.active }],
        rows: [{ city: '', active: 1 }, { city: 'Antigua', active: 0 }]
    });
    assert.match(html, /<td>—<\/td>/);
    assert.match(html, /badge ok">Activo/);
    assert.match(html, /badge off">Inactivo/);
});

test('el bloque de información del reporte se escapa', () => {
    const html = renderReport({ title: 'Info', info: [['Curso', 'Node & SQL']], columns: columnas, rows: [] });
    assert.match(html, /<strong>Curso:<\/strong> Node &amp; SQL/);
});