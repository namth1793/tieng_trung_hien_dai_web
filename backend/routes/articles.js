const express = require('express');
const router = express.Router();
const { getDB } = require('../db/init');

router.get('/', (req, res) => {
  const db = getDB();
  const articles = db.prepare('SELECT id, slug, title, excerpt, image, category, author, views, created_at FROM articles ORDER BY created_at DESC').all();
  res.json(articles);
});

router.get('/recent', (req, res) => {
  const db = getDB();
  const articles = db.prepare('SELECT id, slug, title, excerpt, image, category, author, views, created_at FROM articles ORDER BY created_at DESC LIMIT 3').all();
  res.json(articles);
});

router.get('/:slug', (req, res) => {
  const db = getDB();
  const article = db.prepare('SELECT * FROM articles WHERE slug = ?').get(req.params.slug);
  if (!article) return res.status(404).json({ error: 'Article not found' });
  db.prepare('UPDATE articles SET views = views + 1 WHERE slug = ?').run(req.params.slug);
  res.json(article);
});

module.exports = router;
