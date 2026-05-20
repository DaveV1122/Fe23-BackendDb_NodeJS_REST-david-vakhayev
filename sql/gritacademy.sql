DROP DATABASE IF EXISTS GritAcademy;
CREATE DATABASE GritAcademy;
USE GritAcademy;

CREATE TABLE students (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  fName TEXT NOT NULL,
  lName TEXT NOT NULL,
  town TEXT
);

CREATE TABLE courses (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT
);

CREATE TABLE students_courses (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  students_id BIGINT NOT NULL,
  courses_id BIGINT NOT NULL,
  FOREIGN KEY (students_id) REFERENCES students(id) ON DELETE CASCADE,
  FOREIGN KEY (courses_id) REFERENCES courses(id) ON DELETE CASCADE
);

INSERT INTO students (fName, lName, town) VALUES
('David', 'Vakhayev', 'Malmö'),
('Sara', 'Andersson', 'Lund'),
('Ali', 'Hassan', 'Malmö'),
('Emma', 'Johansson', 'Helsingborg'),
('Oskar', 'Nilsson', 'Lund'),
('Lina', 'Karlsson', 'Malmö'),
('Mohammed', 'Abdi', 'Kristianstad'),
('Nora', 'Berg', 'Helsingborg'),
('Erik', 'Svensson', 'Lund'),
('Maja', 'Persson', 'Malmö');

INSERT INTO courses (name, description) VALUES
('JavaScript Grundkurs', 'Grundläggande programmering med JavaScript'),
('NodeJS Backend', 'Serverutveckling med NodeJS och Express'),
('Databaser MySQL', 'Databashantering med MySQL och SQL-frågor'),
('Frontend HTML CSS', 'Webbutveckling med HTML och CSS'),
('React Framework', 'Komponentbaserad frontendutveckling med React');

INSERT INTO students_courses (students_id, courses_id) VALUES
(1, 1),
(1, 2),
(2, 1),
(3, 3),
(4, 4),
(5, 2),
(6, 5),
(7, 3),
(8, 4),
(9, 5),
(10, 1);