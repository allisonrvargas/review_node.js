import { askOption, printHeader, pause } from './console.js';
import { CampusRepository } from '../repositories/campusRepository.js';
import { ReportService } from '../reports/reportService.js';
import { pathToFileURL } from 'node:url';

const TITLE = 'REPORTES HTML - CAMPUS';

const OPTIONS = [
    'Lista de estudiantes',
    'Lista de profesores',
    'Horarios por curso',
    'Estudiantes por curso',
    'Temas de un curso'
];

// Muestra los cursos y pide el ID; devuelve el curso o null si no existe.
async function chooseCourse(repo, rl, subtitle) {
    printHeader(TITLE, subtitle);
    const courses = await repo.findCourses();
    if (courses.length === 0) {
        console.log('No hay cursos registrados.');
        return null;
    }
    console.table(courses.map(c => ({ id: c.id, código: c.code, descripción: c.description })));

    const id = (await rl.question('ID del curso: ')).trim();
    if (!/^\d+$/.test(id)) {
        console.log('\nDebe ingresar un número válido.');
        return null;
    }
    const course = await repo.findCourseById(id);
    if (!course) console.log(`\nNo existe un curso con ID ${id}.`);
    return course;
}

export async function reportMenu(connection, rl) {
    const repo = new CampusRepository(connection);
    const reports = new ReportService(repo);

    while (true) {
        const opt = await askOption(TITLE, OPTIONS, rl, 'Regresar');
        if (opt === '0') return;

        try {
            let path = null;

            switch (opt) {
                case '1': path = await reports.studentsReport(); break;
                case '2': path = await reports.teachersReport(); break;
                case '3': {
                    const course = await chooseCourse(repo, rl, 'HORARIOS POR CURSO');
                    if (course) path = await reports.schedulesByCourseReport(course);
                    break;
                }
                case '4': {
                    const course = await chooseCourse(repo, rl, 'ESTUDIANTES POR CURSO');
                    if (course) path = await reports.studentsByCourseReport(course);
                    break;
                }
                case '5': {
                    const course = await chooseCourse(repo, rl, 'TEMAS DE UN CURSO');
                    if (course) path = await reports.topicsByCourseReport(course);
                    break;
                }
                default:
                    console.log('\nOpción inválida. Intente de nuevo.');
            }

            if (path) {
                console.log('\n--> Reporte generado con éxito:');
                console.log(`    ${path}`);
                console.log(`    Ábralo en el navegador: ${pathToFileURL(path)}`);
            }
        }
        catch (err) {
            console.error('\nNo se pudo generar el reporte:', err.message);
        }
        await pause(rl);
    }
}
