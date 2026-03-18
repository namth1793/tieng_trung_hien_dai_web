const express = require('express');
const router = express.Router();
const { getDB } = require('../db/init');

router.get('/', (req, res) => {
  const db = getDB();
  const teachers = db.prepare('SELECT * FROM teachers ORDER BY sort_order').all();
  res.json(teachers);
});

module.exports = router;
