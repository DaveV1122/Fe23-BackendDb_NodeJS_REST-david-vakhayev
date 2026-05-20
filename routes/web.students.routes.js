import express from 'express';
import pool from '../config/db.js';

const router = express.Router();

// Show all students
router.get('/', async (req, res) => {
  try {
    const [students] = await pool.query('SELECT * FROM students ORDER BY id');
    res.render('students/index', { students });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Show create form
router.get('/create', (req, res) => {
  res.render('students/create');
});

// Create student
router.post('/', async (req, res) => {
  try {
    const { fName, lName, town } = req.body;

    await pool.query(
      'INSERT INTO students (fName, lName, town) VALUES (?, ?, ?)',
      [fName, lName, town || null]
    );

    res.redirect('/students');
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Show edit form
router.get('/edit/:id', async (req, res) => {
  try {
    const [students] = await pool.query(
      'SELECT * FROM students WHERE id = ?',
      [req.params.id]
    );

    if (students.length === 0) {
      return res.status(404).send('Student not found');
    }

    res.render('students/edit', { student: students[0] });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Update student
router.put('/:id', async (req, res) => {
  try {
    const { fName, lName, town } = req.body;

    await pool.query(
      'UPDATE students SET fName = ?, lName = ?, town = ? WHERE id = ?',
      [fName, lName, town || null, req.params.id]
    );

    res.redirect('/students');
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Delete student
router.delete('/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM students WHERE id = ?', [req.params.id]);
    res.redirect('/students');
  } catch (error) {
    res.status(500).send(error.message);
  }
});

export default router;