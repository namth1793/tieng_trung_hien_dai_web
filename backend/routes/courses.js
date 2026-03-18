const express = require('express');
const router = express.Router();
const { getDB } = require('../db/init');

router.get('/', (req, res) => {
  const db = getDB();
  const courses = db.prepare('SELECT * FROM courses ORDER BY sort_order').all();
  res.json(courses);
});

router.get('/featured', (req, res) => {
  const db = getDB();
  const courses = db.prepare('SELECT * FROM courses WHERE is_featured = 1 ORDER BY sort_order').all();
  res.json(courses);
});

router.get('/:slug', (req, res) => {
  const db = getDB();
  const course = db.prepare('SELECT * FROM courses WHERE slug = ?').get(req.params.slug);
  if (!course) return res.status(404).json({ error: 'Course not found' });
  res.json(course);
});

module.exports = router;
