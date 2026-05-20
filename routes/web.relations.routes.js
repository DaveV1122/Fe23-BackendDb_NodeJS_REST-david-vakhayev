import express from 'express';
import pool from '../config/db.js';

const router = express.Router();

// Show all relations
router.get('/', async (req, res) => {
  try {
    const [relations] = await pool.query(
      `
      SELECT 
        sc.id,
        sc.students_id,
        sc.courses_id,
        s.fName,
        s.lName,
        c.name AS course_name
      FROM students_courses sc
      JOIN students s ON sc.students_id = s.id
      JOIN courses c ON sc.courses_id = c.id
      ORDER BY sc.id
      `
    );

    res.render('relations/index', { relations });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Show create form
router.get('/create', async (req, res) => {
  try {
    const [students] = await pool.query('SELECT * FROM students ORDER BY fName');
    const [courses] = await pool.query('SELECT * FROM courses ORDER BY name');

    res.render('relations/create', { students, courses });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Create relation
router.post('/', async (req, res) => {
  try {
    const { students_id, courses_id } = req.body;

    await pool.query(
      'INSERT INTO students_courses (students_id, courses_id) VALUES (?, ?)',
      [students_id, courses_id]
    );

    res.redirect('/relations');
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Show edit form
router.get('/edit/:id', async (req, res) => {
  try {
    const [relations] = await pool.query(
      'SELECT * FROM students_courses WHERE id = ?',
      [req.params.id]
    );

    if (relations.length === 0) {
      return res.status(404).send('Relation not found');
    }

    const [students] = await pool.query('SELECT * FROM students ORDER BY fName');
    const [courses] = await pool.query('SELECT * FROM courses ORDER BY name');

    res.render('relations/edit', {
      relation: relations[0],
      students,
      courses
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Update relation
router.put('/:id', async (req, res) => {
  try {
    const { students_id, courses_id } = req.body;

    await pool.query(
      'UPDATE students_courses SET students_id = ?, courses_id = ? WHERE id = ?',
      [students_id, courses_id, req.params.id]
    );

    res.redirect('/relations');
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Delete relation
router.delete('/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM students_courses WHERE id = ?', [req.params.id]);
    res.redirect('/relations');
  } catch (error) {
    res.status(500).send(error.message);
  }
});

export default router;