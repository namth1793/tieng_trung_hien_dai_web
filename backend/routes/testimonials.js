const express = require('express');
const router = express.Router();
const { getDB } = require('../db/init');

router.get('/', (req, res) => {
  const db = getDB();
  const testimonials = db.prepare('SELECT * FROM testimonials ORDER BY id').all();
  res.json(testimonials);
});

module.exports = router;
