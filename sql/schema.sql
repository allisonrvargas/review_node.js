-- Esquema según el diagrama (usar solo si aún no tiene las tablas creadas)
CREATE DATABASE IF NOT EXISTS campus CHARACTER SET utf8mb4;
USE campus;
SET NAMES utf8mb4;

CREATE TABLE IF NOT EXISTS identification_types (
    id INT AUTO_INCREMENT PRIMARY KEY,
    code VARCHAR(6) NOT NULL,
    name VARCHAR(100) NOT NULL,
    description VARCHAR(250)
);

CREATE TABLE IF NOT EXISTS cities (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    code VARCHAR(10) NOT NULL,
    name VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS students (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    code VARCHAR(14) NOT NULL,
    firstName VARCHAR(60) NOT NULL,
    lastName VARCHAR(60) NOT NULL,
    identification_type_id INT NOT NULL,
    identificationNumber VARCHAR(16) NOT NULL,
    gender VARCHAR(20),
    birthdate DATETIME,
    email VARCHAR(60),
    address VARCHAR(100),
    city_id BIGINT,
    FOREIGN KEY (identification_type_id) REFERENCES identification_types(id),
    FOREIGN KEY (city_id) REFERENCES cities(id)
);

CREATE TABLE IF NOT EXISTS teachers (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    firstName VARCHAR(60) NOT NULL,
    lastName VARCHAR(60) NOT NULL,
    identification_type_id INT NOT NULL,
    identificationNumber VARCHAR(16) NOT NULL,
    email VARCHAR(100),
    FOREIGN KEY (identification_type_id) REFERENCES identification_types(id)
);

CREATE TABLE IF NOT EXISTS courses (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    code VARCHAR(10) NOT NULL,
    description VARCHAR(250),
    intensity INT,
    weight INT,
    active TINYINT NOT NULL DEFAULT 1
);

CREATE TABLE IF NOT EXISTS topics (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    course_id BIGINT NOT NULL,
    code VARCHAR(10),
    title VARCHAR(100) NOT NULL,
    description VARCHAR(250),
    active TINYINT NOT NULL DEFAULT 1,
    FOREIGN KEY (course_id) REFERENCES courses(id)
);

CREATE TABLE IF NOT EXISTS classrooms (
    id INT AUTO_INCREMENT PRIMARY KEY,
    code VARCHAR(10) NOT NULL,
    description VARCHAR(250),
    capacity INT,
    active TINYINT NOT NULL DEFAULT 1
);

CREATE TABLE IF NOT EXISTS courses_schedules (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    course_id BIGINT NOT NULL,
    teacher_id BIGINT NOT NULL,
    classroom_id INT NOT NULL,
    start_date DATETIME,
    end_date DATETIME,
    active TINYINT NOT NULL DEFAULT 1,
    FOREIGN KEY (course_id) REFERENCES courses(id),
    FOREIGN KEY (teacher_id) REFERENCES teachers(id),
    FOREIGN KEY (classroom_id) REFERENCES classrooms(id)
);

CREATE TABLE IF NOT EXISTS inscriptions (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    course_schedule BIGINT NOT NULL,
    student_id BIGINT NOT NULL,
    register_date DATETIME,
    active TINYINT NOT NULL DEFAULT 1,
    FOREIGN KEY (course_schedule) REFERENCES courses_schedules(id),
    FOREIGN KEY (student_id) REFERENCES students(id)
);

CREATE TABLE IF NOT EXISTS rates (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    inscription_id BIGINT NOT NULL,
    rate BIGINT,
    comments VARCHAR(250),
    FOREIGN KEY (inscription_id) REFERENCES inscriptions(id)
);
