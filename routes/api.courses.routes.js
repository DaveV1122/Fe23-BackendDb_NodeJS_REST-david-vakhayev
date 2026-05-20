import express from 'express';
import pool from '../config/db.js';

const router = express.Router();

async function getCourseWithStudents(whereSql = '', params = []) {
  const [rows] = await pool.query(
    `
    SELECT 
      c.id AS course_id,
      c.name,
      c.description,
      s.id AS student_id,
      s.fName,
      s.lName,
      s.town
    FROM courses c
    LEFT JOIN students_courses sc ON c.id = sc.courses_id
    LEFT JOIN students s ON sc.students_id = s.id
    ${whereSql}
    ORDER BY c.id, s.id
    `,
    params
  );

  const coursesMap = new Map();

  for (const row of rows) {
    if (!coursesMap.has(row.course_id)) {
      coursesMap.set(row.course_id, {
        id: row.course_id,
        name: row.name,
        description: row.description,
        students: []
      });
    }

    if (row.student_id) {
      coursesMap.get(row.course_id).students.push({
        id: row.student_id,
        fName: row.fName,
        lName: row.lName,
        town: row.town
      });
    }
  }

  return [...coursesMap.values()];
}

// G: all courses
router.get('/', async (req, res) => {
  try {
    const [courses] = await pool.query('SELECT * FROM courses ORDER BY id');
    res.json(courses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// G: course by id with students
router.get('/id/:id', async (req, res) => {
  try {
    const courses = await getCourseWithStudents('WHERE c.id = ?', [req.params.id]);

    if (courses.length === 0) {
      return res.status(404).json({ message: 'Course not found' });
    }

    res.json(courses[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// G: course by exact name with students
router.get('/name/:name', async (req, res) => {
  try {
    const courses = await getCourseWithStudents('WHERE c.name = ?', [req.params.name]);
    res.json(courses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// G: course with word in name
router.get('/search/name/:word', async (req, res) => {
  try {
    const courses = await getCourseWithStudents('WHERE c.name LIKE ?', [`%${req.params.word}%`]);
    res.json(courses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// G: course with word in description
router.get('/search/description/:word', async (req, res) => {
  try {
    const courses = await getCourseWithStudents('WHERE c.description LIKE ?', [`%${req.params.word}%`]);
    res.json(courses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// VG: add course
router.post('/', async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name) {
      return res.status(400).json({ message: 'name is required' });
    }

    const [result] = await pool.query(
      'INSERT INTO courses (name, description) VALUES (?, ?)',
      [name, description || null]
    );

    res.status(201).json({
      message: 'Course created',
      id: result.insertId,
      name,
      description
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// VG: delete course by id
router.delete('/:id', async (req, res) => {
  try {
    const [result] = await pool.query('DELETE FROM courses WHERE id = ?', [req.params.id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Course not found' });
    }

    res.json({ message: 'Course deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;