import express from 'express';
import pool from '../config/db.js';

const router = express.Router();

// G: all relations
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
        s.town,
        c.name AS course_name,
        c.description AS course_description
      FROM students_courses sc
      JOIN students s ON sc.students_id = s.id
      JOIN courses c ON sc.courses_id = c.id
      ORDER BY sc.id
      `
    );

    res.json(relations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// VG: add student-course relation
router.post('/', async (req, res) => {
  try {
    const { students_id, courses_id } = req.body;

    if (!students_id || !courses_id) {
      return res.status(400).json({ message: 'students_id and courses_id are required' });
    }

    const [result] = await pool.query(
      'INSERT INTO students_courses (students_id, courses_id) VALUES (?, ?)',
      [students_id, courses_id]
    );

    res.status(201).json({
      message: 'Relation created',
      id: result.insertId,
      students_id,
      courses_id
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// VG: delete relation by id
router.delete('/:id', async (req, res) => {
  try {
    const [result] = await pool.query('DELETE FROM students_courses WHERE id = ?', [req.params.id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Relation not found' });
    }

    res.json({ message: 'Relation deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;