import express from 'express';
import pool from '../config/db.js';

const router = express.Router();

async function getStudentWithCourses(whereSql = '', params = []) {
  const [rows] = await pool.query(
    `
    SELECT 
      s.id AS student_id,
      s.fName,
      s.lName,
      s.town,
      c.id AS course_id,
      c.name AS course_name,
      c.description AS course_description
    FROM students s
    LEFT JOIN students_courses sc ON s.id = sc.students_id
    LEFT JOIN courses c ON sc.courses_id = c.id
    ${whereSql}
    ORDER BY s.id, c.id
    `,
    params
  );

  const studentsMap = new Map();

  for (const row of rows) {
    if (!studentsMap.has(row.student_id)) {
      studentsMap.set(row.student_id, {
        id: row.student_id,
        fName: row.fName,
        lName: row.lName,
        town: row.town,
        courses: []
      });
    }

    if (row.course_id) {
      studentsMap.get(row.student_id).courses.push({
        id: row.course_id,
        name: row.course_name,
        description: row.course_description
      });
    }
  }

  return [...studentsMap.values()];
}

// G: all students
router.get('/', async (req, res) => {
  try {
    const [students] = await pool.query('SELECT * FROM students ORDER BY id');
    res.json(students);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// G: one student by id with courses
router.get('/id/:id', async (req, res) => {
  try {
    const students = await getStudentWithCourses('WHERE s.id = ?', [req.params.id]);

    if (students.length === 0) {
      return res.status(404).json({ message: 'Student not found' });
    }

    res.json(students[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// G: students by first name with courses
router.get('/fname/:fname', async (req, res) => {
  try {
    const students = await getStudentWithCourses('WHERE s.fName = ?', [req.params.fname]);
    res.json(students);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// G: students by last name with courses
router.get('/lname/:lname', async (req, res) => {
  try {
    const students = await getStudentWithCourses('WHERE s.lName = ?', [req.params.lname]);
    res.json(students);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// G: students by town with courses
router.get('/town/:town', async (req, res) => {
  try {
    const students = await getStudentWithCourses('WHERE s.town = ?', [req.params.town]);
    res.json(students);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// VG: add student
router.post('/', async (req, res) => {
  try {
    const { fName, lName, town } = req.body;

    if (!fName || !lName) {
      return res.status(400).json({ message: 'fName and lName are required' });
    }

    const [result] = await pool.query(
      'INSERT INTO students (fName, lName, town) VALUES (?, ?, ?)',
      [fName, lName, town || null]
    );

    res.status(201).json({
      message: 'Student created',
      id: result.insertId,
      fName,
      lName,
      town
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// VG: delete student by id
router.delete('/:id', async (req, res) => {
  try {
    const [result] = await pool.query('DELETE FROM students WHERE id = ?', [req.params.id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Student not found' });
    }

    res.json({ message: 'Student deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;