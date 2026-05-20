import express from 'express';
import pool from '../config/db.js';

const router = express.Router();

// Show all courses
router.get('/', async (req, res) => {
  try {
    const [courses] = await pool.query('SELECT * FROM courses ORDER BY id');
    res.render('courses/index', { courses });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Show create form
router.get('/create', (req, res) => {
  res.render('courses/create');
});

// Create course
router.post('/', async (req, res) => {
  try {
    const { name, description } = req.body;

    await pool.query(
      'INSERT INTO courses (name, description) VALUES (?, ?)',
      [name, description || null]
    );

    res.redirect('/courses');
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Show edit form
router.get('/edit/:id', async (req, res) => {
  try {
    const [courses] = await pool.query(
      'SELECT * FROM courses WHERE id = ?',
      [req.params.id]
    );

    if (courses.length === 0) {
      return res.status(404).send('Course not found');
    }

    res.render('courses/edit', { course: courses[0] });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Update course
router.put('/:id', async (req, res) => {
  try {
    const { name, description } = req.body;

    await pool.query(
      'UPDATE courses SET name = ?, description = ? WHERE id = ?',
      [name, description || null, req.params.id]
    );

    res.redirect('/courses');
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Delete course
router.delete('/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM courses WHERE id = ?', [req.params.id]);
    res.redirect('/courses');
  } catch (error) {
    res.status(500).send(error.message);
  }
});

export default router;