const LINE = '='.repeat(42);

export function printHeader(title, subtitle) {
    console.clear();
    console.log(LINE);
    console.log(`   ${title}`);
    console.log(LINE);
    if (subtitle) console.log(`--- ${subtitle} ---\n`);
}

// Muestra las opciones numeradas y devuelve lo que escribió el usuario.
export async function askOption(title, options, rl, exitLabel = 'Salir') {
    printHeader(title);
    options.forEach((text, i) => console.log(`${i + 1}. ${text}`));
    console.log(`0. ${exitLabel}`);
    return (await rl.question('\n-> Elija una opción: ')).trim();
}

export async function pause(rl) {
    await rl.question('\n=> Presione enter para continuar...');
}
