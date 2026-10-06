/**
 * Todas las consultas SQL del campus en un solo lugar.
 * Recibe la conexión por constructor (así es fácil de probar o cambiar).
 */
export class CampusRepository {
    #db;

    constructor(connection) {
        this.#db = connection;
    }

    async findCourses() {
        const [rows] = await this.#db.query(
            'SELECT id, code, description, intensity, weight, active FROM courses ORDER BY id'
        );
        return rows;
    }

    async findCourseById(courseId) {
        const [rows] = await this.#db.execute(
            'SELECT id, code, description, intensity, weight, active FROM courses WHERE id = ?',
            [courseId]
        );
        return rows[0] ?? null;
    }

    async findStudents() {
        const [rows] = await this.#db.query(`
            SELECT s.id, s.code,
                   CONCAT(s.firstName, ' ', s.lastName) AS fullName,
                   it.code AS idType, s.identificationNumber,
                   s.gender, s.birthdate, s.email, s.address,
                   c.name AS city
            FROM students s
            INNER JOIN identification_types it ON it.id = s.identification_type_id
            LEFT JOIN cities c ON c.id = s.city_id
            ORDER BY s.lastName, s.firstName`);
        return rows;
    }

    async findTeachers() {
        const [rows] = await this.#db.query(`
            SELECT t.id,
                   CONCAT(t.firstName, ' ', t.lastName) AS fullName,
                   it.code AS idType, t.identificationNumber, t.email
            FROM teachers t
            INNER JOIN identification_types it ON it.id = t.identification_type_id
            ORDER BY t.lastName, t.firstName`);
        return rows;
    }

    async findSchedulesByCourse(courseId) {
        const [rows] = await this.#db.execute(`
            SELECT cs.id,
                   CONCAT(t.firstName, ' ', t.lastName) AS teacher,
                   cl.code AS classroom, cl.capacity,
                   cs.start_date, cs.end_date, cs.active
            FROM courses_schedules cs
            INNER JOIN teachers t ON t.id = cs.teacher_id
            INNER JOIN classrooms cl ON cl.id = cs.classroom_id
            WHERE cs.course_id = ?
            ORDER BY cs.start_date`, [courseId]);
        return rows;
    }

    async findStudentsByCourse(courseId) {
        const [rows] = await this.#db.execute(`
            SELECT s.code,
                   CONCAT(s.firstName, ' ', s.lastName) AS fullName,
                   s.email,
                   cs.id AS scheduleId, cs.start_date, cs.end_date,
                   i.register_date, i.active
            FROM inscriptions i
            INNER JOIN courses_schedules cs ON cs.id = i.course_schedule
            INNER JOIN students s ON s.id = i.student_id
            WHERE cs.course_id = ?
            ORDER BY cs.start_date, s.lastName, s.firstName`, [courseId]);
        return rows;
    }

    async findTopicsByCourse(courseId) {
        const [rows] = await this.#db.execute(
            'SELECT id, code, title, description, active FROM topics WHERE course_id = ? ORDER BY id',
            [courseId]
        );
        return rows;
    }
}
