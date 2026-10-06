/**
 * Convierte un conjunto de datos en una página HTML con una tabla.
 * columns: [{ key: 'campo_sql', label: 'Encabezado', format?: (valor, fila) => texto }]
 */

export function escapeHtml(value) {
    return String(value ?? '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

// Formatos reutilizables para columnas
export const formats = {
    active: value => (value === 1 || value === true
        ? '<span class="badge ok">Activo</span>'
        : '<span class="badge off">Inactivo</span>'),
    date: value => escapeHtml(value ? String(value).slice(0, 10) : '—'),
    dateTime: value => escapeHtml(value ? String(value).slice(0, 16) : '—')
};

function renderCell(column, row) {
    const raw = row[column.key];
    // los formatos propios devuelven HTML ya seguro; el valor por defecto se escapa
    if (column.format) return column.format(raw, row);
    return raw === null || raw === undefined || raw === '' ? '—' : escapeHtml(raw);
}

export function renderReport({ title, subtitle = '', info = [], columns, rows }) {
    const infoHtml = info.length
        ? `<ul class="info">${info.map(([k, v]) => `<li><strong>${escapeHtml(k)}:</strong> ${escapeHtml(v)}</li>`).join('')}</ul>`
        : '';

    const head = columns.map(c => `<th>${escapeHtml(c.label)}</th>`).join('');
    const body = rows.length
        ? rows.map(row => `<tr>${columns.map(c => `<td>${renderCell(c, row)}</td>`).join('')}</tr>`).join('\n')
        : `<tr><td class="empty" colspan="${columns.length}">No hay registros para mostrar.</td></tr>`;

    const generatedAt = new Date().toLocaleString('es-GT');

    return `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${escapeHtml(title)}</title>
<style>
  :root { --main: #1f6f8b; --soft: #e8f3f7; --text: #22313a; }
  * { box-sizing: border-box; }
  body { font-family: "Segoe UI", Arial, sans-serif; margin: 0; background: #f4f6f8; color: var(--text); }
  header { background: var(--main); color: #fff; padding: 24px 32px; }
  header h1 { margin: 0 0 4px; font-size: 1.6rem; }
  header p { margin: 0; opacity: .85; }
  main { max-width: 1100px; margin: 24px auto; padding: 0 16px; }
  .info { background: #fff; border-left: 4px solid var(--main); padding: 12px 24px; list-style: none; border-radius: 4px; }
  .info li { margin: 4px 0; }
  .table-wrap { overflow-x: auto; background: #fff; border-radius: 6px; box-shadow: 0 1px 4px rgba(0,0,0,.12); }
  table { width: 100%; border-collapse: collapse; }
  th { background: var(--main); color: #fff; text-align: left; padding: 10px 12px; white-space: nowrap; }
  td { padding: 9px 12px; border-bottom: 1px solid #e3e8ec; }
  tbody tr:nth-child(even) { background: var(--soft); }
  tbody tr:hover { background: #d3e8ef; }
  .empty { text-align: center; padding: 28px; color: #7a8a94; }
  .badge { padding: 2px 10px; border-radius: 12px; font-size: .8rem; font-weight: 600; }
  .badge.ok { background: #d6f2df; color: #1b7a3a; }
  .badge.off { background: #f8dcdc; color: #a12a2a; }
  footer { text-align: center; color: #7a8a94; font-size: .85rem; padding: 18px; }
</style>
</head>
<body>
<header>
  <h1>${escapeHtml(title)}</h1>
  <p>${escapeHtml(subtitle)}</p>
</header>
<main>
  ${infoHtml}
  <p><strong>Total de registros:</strong> ${rows.length}</p>
  <div class="table-wrap">
    <table>
      <thead><tr>${head}</tr></thead>
      <tbody>
${body}
      </tbody>
    </table>
  </div>
</main>
<footer>Generado el ${escapeHtml(generatedAt)}</footer>
</body>
</html>`;
}
