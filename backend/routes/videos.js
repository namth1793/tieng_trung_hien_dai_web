const express = require('express');
const router = express.Router();
const { getDB } = require('../db/init');

router.get('/', (req, res) => {
  const db = getDB();
  const videos = db.prepare('SELECT * FROM videos ORDER BY sort_order').all();
  res.json(videos);
});

module.exports = router;
