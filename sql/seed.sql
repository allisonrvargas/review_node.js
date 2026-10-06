SET NAMES utf8mb4;
-- Datos de prueba (opcional). Ejecutar después de schema.sql
USE campus;

INSERT INTO identification_types (code, name, description) VALUES
 ('DPI', 'Documento Personal de Identificación', 'Documento nacional de Guatemala'),
 ('PAS', 'Pasaporte', 'Pasaporte internacional');

INSERT INTO cities (code, name) VALUES
 ('GUA', 'Ciudad de Guatemala'), ('QZT', 'Quetzaltenango'), ('ANT', 'Antigua Guatemala');

INSERT INTO students (code, firstName, lastName, identification_type_id, identificationNumber, gender, birthdate, email, address, city_id) VALUES
 ('EST-2024-0001', 'Ana',    'Morales',  1, '2456789010101', 'Femenino',  '2003-04-12 00:00:00', 'ana.morales@mail.com',  'Zona 1',  1),
 ('EST-2024-0002', 'Luis',   'Pérez',    1, '2567890120101', 'Masculino', '2002-09-30 00:00:00', 'luis.perez@mail.com',   'Zona 10', 1),
 ('EST-2024-0003', 'María',  'López',    2, 'P123456',       'Femenino',  '2001-01-22 00:00:00', 'maria.lopez@mail.com',  'Zona 3',  2),
 ('EST-2024-0004', 'Carlos', 'Gómez',    1, '2678901230101', 'Masculino', '2004-06-05 00:00:00', 'carlos.gomez@mail.com', 'Centro',  3);

INSERT INTO teachers (firstName, lastName, identification_type_id, identificationNumber, email) VALUES
 ('Roberto', 'Castillo', 1, '1987654320101', 'r.castillo@campus.edu'),
 ('Elena',   'Ramírez',  1, '1876543210101', 'e.ramirez@campus.edu');

INSERT INTO courses (code, description, intensity, weight, active) VALUES
 ('PRG-101', 'Programación Orientada a Objetos', 60, 5, 1),
 ('BDD-201', 'Bases de Datos Relacionales',      48, 4, 1),
 ('WEB-301', 'Desarrollo Web con Node.js',       40, 3, 1);

INSERT INTO topics (course_id, code, title, description, active) VALUES
 (1, 'POO-01', 'Clases y objetos',        'Atributos, métodos y constructores',      1),
 (1, 'POO-02', 'Herencia y polimorfismo', 'Reutilización de código con extends',     1),
 (1, 'POO-03', 'Patrones de diseño',      'Factory, Observer, Adapter',              1),
 (2, 'BD-01',  'Modelo entidad-relación', 'Diseño de diagramas ER',                  1),
 (2, 'BD-02',  'SQL con JOIN',            'Consultas sobre varias tablas',           1),
 (3, 'WEB-01', 'Módulos ES',              'import / export en Node.js',              1);

INSERT INTO classrooms (code, description, capacity, active) VALUES
 ('A-101', 'Laboratorio de cómputo 1', 30, 1),
 ('B-202', 'Aula magna',               60, 1);

INSERT INTO courses_schedules (course_id, teacher_id, classroom_id, start_date, end_date, active) VALUES
 (1, 1, 1, '2024-02-05 08:00:00', '2024-05-31 10:00:00', 1),
 (1, 2, 2, '2024-06-03 14:00:00', '2024-09-27 16:00:00', 1),
 (2, 2, 1, '2024-02-06 10:00:00', '2024-05-30 12:00:00', 1),
 (3, 1, 2, '2024-03-04 18:00:00', '2024-06-28 20:00:00', 0);

INSERT INTO inscriptions (course_schedule, student_id, register_date, active) VALUES
 (1, 1, '2024-01-20 09:00:00', 1),
 (1, 2, '2024-01-22 10:30:00', 1),
 (2, 3, '2024-05-15 11:00:00', 1),
 (3, 1, '2024-01-25 08:15:00', 1),
 (3, 4, '2024-01-26 16:40:00', 0);

INSERT INTO rates (inscription_id, rate, comments) VALUES
 (1, 95, 'Excelente desempeño'), (2, 80, 'Buen trabajo');
