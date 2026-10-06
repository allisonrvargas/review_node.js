import { mkdir, writeFile } from 'node:fs/promises';
import { resolve, join } from 'node:path';
import { renderReport, formats } from './htmlRenderer.js';

const OUTPUT_DIR = resolve('reportes');

/**
 * Arma cada reporte (datos + columnas) y lo guarda como archivo .html.
 * Cada método devuelve la ruta del archivo creado.
 */
export class ReportService {
    #repo;

    constructor(repository) {
        this.#repo = repository;
    }

    async studentsReport() {
        const rows = await this.#repo.findStudents();
        const html = renderReport({
            title: 'Listado de Estudiantes',
            subtitle: 'Campus - estudiantes registrados',
            rows,
            columns: [
                { key: 'code', label: 'Código' },
                { key: 'fullName', label: 'Nombre completo' },
                { key: 'idType', label: 'Tipo ID' },
                { key: 'identificationNumber', label: 'No. identificación' },
                { key: 'gender', label: 'Género' },
                { key: 'birthdate', label: 'Nacimiento', format: formats.date },
                { key: 'email', label: 'Correo' },
                { key: 'city', label: 'Ciudad' }
            ]
        });
        return this.#save('estudiantes.html', html);
    }

    async teachersReport() {
        const rows = await this.#repo.findTeachers();
        const html = renderReport({
            title: 'Listado de Profesores',
            subtitle: 'Campus - profesores registrados',
            rows,
            columns: [
                { key: 'id', label: 'ID' },
                { key: 'fullName', label: 'Nombre completo' },
                { key: 'idType', label: 'Tipo ID' },
                { key: 'identificationNumber', label: 'No. identificación' },
                { key: 'email', label: 'Correo' }
            ]
        });
        return this.#save('profesores.html', html);
    }

    async schedulesByCourseReport(course) {
        const rows = await this.#repo.findSchedulesByCourse(course.id);
        const html = renderReport({
            title: `Horarios del curso ${course.code}`,
            subtitle: 'Campus - horarios programados',
            info: [['Curso', course.description], ['Intensidad (horas)', course.intensity]],
            rows,
            columns: [
                { key: 'id', label: 'Horario' },
                { key: 'teacher', label: 'Profesor' },
                { key: 'classroom', label: 'Aula' },
                { key: 'capacity', label: 'Capacidad' },
                { key: 'start_date', label: 'Inicio', format: formats.dateTime },
                { key: 'end_date', label: 'Fin', format: formats.dateTime },
                { key: 'active', label: 'Estado', format: formats.active }
            ]
        });
        return this.#save(`horarios_${course.code}.html`, html);
    }

    async studentsByCourseReport(course) {
        const rows = await this.#repo.findStudentsByCourse(course.id);
        const html = renderReport({
            title: `Estudiantes inscritos en ${course.code}`,
            subtitle: 'Campus - inscripciones por curso',
            info: [['Curso', course.description]],
            rows,
            columns: [
                { key: 'code', label: 'Código' },
                { key: 'fullName', label: 'Estudiante' },
                { key: 'email', label: 'Correo' },
                { key: 'scheduleId', label: 'Horario' },
                { key: 'start_date', label: 'Inicio curso', format: formats.date },
                { key: 'register_date', label: 'Inscrito el', format: formats.date },
                { key: 'active', label: 'Estado', format: formats.active }
            ]
        });
        return this.#save(`estudiantes_${course.code}.html`, html);
    }

    async topicsByCourseReport(course) {
        const rows = await this.#repo.findTopicsByCourse(course.id);
        const html = renderReport({
            title: `Temas del curso ${course.code}`,
            subtitle: 'Campus - contenido del curso',
            info: [['Curso', course.description]],
            rows,
            columns: [
                { key: 'code', label: 'Código' },
                { key: 'title', label: 'Título' },
                { key: 'description', label: 'Descripción' },
                { key: 'active', label: 'Estado', format: formats.active }
            ]
        });
        return this.#save(`temas_${course.code}.html`, html);
    }

    async #save(fileName, html) {
        // el código del curso viene de la BD, pero igual limpiamos el nombre del archivo
        const safeName = fileName.replace(/[^\w.\-]/g, '_');
        await mkdir(OUTPUT_DIR, { recursive: true });
        const fullPath = join(OUTPUT_DIR, safeName);
        await writeFile(fullPath, html, 'utf-8');
        return fullPath;
    }
}

