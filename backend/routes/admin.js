const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const { getDB } = require('../db/init');
const { authMiddleware, JWT_SECRET } = require('../middleware/auth');

const hash = (pw) => crypto.createHash('sha256').update(pw).digest('hex');
const slugify = (text) => text.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

// ── Auth ─────────────────────────────────────────────────────────────────────

router.post('/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'Thiếu email hoặc mật khẩu' });
  const db = getDB();
  const admin = db.prepare('SELECT * FROM admins WHERE email = ?').get(email);
  if (!admin || admin.password_hash !== hash(password)) {
    return res.status(401).json({ error: 'Email hoặc mật khẩu không đúng' });
  }
  const token = jwt.sign({ id: admin.id, email: admin.email, name: admin.name }, JWT_SECRET, { expiresIn: '7d' });
  res.json({ token, admin: { id: admin.id, email: admin.email, name: admin.name } });
});

router.get('/me', authMiddleware, (req, res) => {
  res.json(req.admin);
});

// ── Dashboard stats ───────────────────────────────────────────────────────────

router.get('/stats', authMiddleware, (req, res) => {
  const db = getDB();
  res.json({
    courses: db.prepare('SELECT COUNT(*) as c FROM courses').get().c,
    articles: db.prepare('SELECT COUNT(*) as c FROM articles').get().c,
    teachers: db.prepare('SELECT COUNT(*) as c FROM teachers').get().c,
    testimonials: db.prepare('SELECT COUNT(*) as c FROM testimonials').get().c,
    videos: db.prepare('SELECT COUNT(*) as c FROM videos').get().c,
    registrations: db.prepare('SELECT COUNT(*) as c FROM registrations').get().c,
    new_registrations: db.prepare("SELECT COUNT(*) as c FROM registrations WHERE status = 'new'").get().c,
  });
});

// ── Registrations ─────────────────────────────────────────────────────────────

router.get('/registrations', authMiddleware, (req, res) => {
  const db = getDB();
  const rows = db.prepare('SELECT * FROM registrations ORDER BY created_at DESC').all();
  res.json(rows);
});

router.put('/registrations/:id/status', authMiddleware, (req, res) => {
  const { status } = req.body;
  const db = getDB();
  db.prepare('UPDATE registrations SET status = ? WHERE id = ?').run(status, req.params.id);
  res.json({ success: true });
});

router.delete('/registrations/:id', authMiddleware, (req, res) => {
  const db = getDB();
  db.prepare('DELETE FROM registrations WHERE id = ?').run(req.params.id);
  res.json({ success: true });
});

// ── Courses CRUD ──────────────────────────────────────────────────────────────

router.get('/courses', authMiddleware, (req, res) => {
  const db = getDB();
  res.json(db.prepare('SELECT * FROM courses ORDER BY sort_order, id').all());
});

router.post('/courses', authMiddleware, (req, res) => {
  const { title, subtitle, description, level, duration, sessions, fee, image, badge, is_featured, sort_order, slug } = req.body;
  if (!title) return res.status(400).json({ error: 'Thiếu tiêu đề' });
  const db = getDB();
  const finalSlug = slug || slugify(title) + '-' + Date.now();
  const result = db.prepare(`INSERT INTO courses (slug, title, subtitle, description, level, duration, sessions, fee, image, badge, is_featured, sort_order)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`).run(finalSlug, title, subtitle, description, level, duration, sessions, fee, image, badge, is_featured ? 1 : 0, sort_order || 0);
  res.json({ id: result.lastInsertRowid, slug: finalSlug });
});

router.put('/courses/:id', authMiddleware, (req, res) => {
  const { title, subtitle, description, level, duration, sessions, fee, image, badge, is_featured, sort_order } = req.body;
  const db = getDB();
  db.prepare(`UPDATE courses SET title=?, subtitle=?, description=?, level=?, duration=?, sessions=?, fee=?, image=?, badge=?, is_featured=?, sort_order=? WHERE id=?`)
    .run(title, subtitle, description, level, duration, sessions, fee, image, badge, is_featured ? 1 : 0, sort_order || 0, req.params.id);
  res.json({ success: true });
});

router.delete('/courses/:id', authMiddleware, (req, res) => {
  getDB().prepare('DELETE FROM courses WHERE id = ?').run(req.params.id);
  res.json({ success: true });
});

// ── Articles CRUD ─────────────────────────────────────────────────────────────

router.get('/articles', authMiddleware, (req, res) => {
  const db = getDB();
  res.json(db.prepare('SELECT * FROM articles ORDER BY created_at DESC').all());
});

router.post('/articles', authMiddleware, (req, res) => {
  const { title, excerpt, content, image, category, author, slug } = req.body;
  if (!title) return res.status(400).json({ error: 'Thiếu tiêu đề' });
  const db = getDB();
  const finalSlug = slug || slugify(title) + '-' + Date.now();
  const result = db.prepare(`INSERT INTO articles (slug, title, excerpt, content, image, category, author)
    VALUES (?, ?, ?, ?, ?, ?, ?)`).run(finalSlug, title, excerpt, content, image, category, author);
  res.json({ id: result.lastInsertRowid, slug: finalSlug });
});

router.put('/articles/:id', authMiddleware, (req, res) => {
  const { title, excerpt, content, image, category, author } = req.body;
  getDB().prepare(`UPDATE articles SET title=?, excerpt=?, content=?, image=?, category=?, author=? WHERE id=?`)
    .run(title, excerpt, content, image, category, author, req.params.id);
  res.json({ success: true });
});

router.delete('/articles/:id', authMiddleware, (req, res) => {
  getDB().prepare('DELETE FROM articles WHERE id = ?').run(req.params.id);
  res.json({ success: true });
});

// ── Teachers CRUD ─────────────────────────────────────────────────────────────

router.get('/teachers', authMiddleware, (req, res) => {
  res.json(getDB().prepare('SELECT * FROM teachers ORDER BY sort_order, id').all());
});

router.post('/teachers', authMiddleware, (req, res) => {
  const { name, title, degree, specialization, university, bio, photo, years_experience, sort_order } = req.body;
  if (!name) return res.status(400).json({ error: 'Thiếu tên' });
  const result = getDB().prepare(`INSERT INTO teachers (name, title, degree, specialization, university, bio, photo, years_experience, sort_order)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`).run(name, title, degree, specialization, university, bio, photo, years_experience, sort_order || 0);
  res.json({ id: result.lastInsertRowid });
});

router.put('/teachers/:id', authMiddleware, (req, res) => {
  const { name, title, degree, specialization, university, bio, photo, years_experience, sort_order } = req.body;
  getDB().prepare(`UPDATE teachers SET name=?, title=?, degree=?, specialization=?, university=?, bio=?, photo=?, years_experience=?, sort_order=? WHERE id=?`)
    .run(name, title, degree, specialization, university, bio, photo, years_experience, sort_order || 0, req.params.id);
  res.json({ success: true });
});

router.delete('/teachers/:id', authMiddleware, (req, res) => {
  getDB().prepare('DELETE FROM teachers WHERE id = ?').run(req.params.id);
  res.json({ success: true });
});

// ── Testimonials CRUD ─────────────────────────────────────────────────────────

router.get('/testimonials', authMiddleware, (req, res) => {
  res.json(getDB().prepare('SELECT * FROM testimonials ORDER BY created_at DESC').all());
});

router.post('/testimonials', authMiddleware, (req, res) => {
  const { student_name, photo, course, rating, review, success_story } = req.body;
  if (!student_name) return res.status(400).json({ error: 'Thiếu tên học viên' });
  const result = getDB().prepare(`INSERT INTO testimonials (student_name, photo, course, rating, review, success_story)
    VALUES (?, ?, ?, ?, ?, ?)`).run(student_name, photo, course, rating || 5, review, success_story);
  res.json({ id: result.lastInsertRowid });
});

router.put('/testimonials/:id', authMiddleware, (req, res) => {
  const { student_name, photo, course, rating, review, success_story } = req.body;
  getDB().prepare(`UPDATE testimonials SET student_name=?, photo=?, course=?, rating=?, review=?, success_story=? WHERE id=?`)
    .run(student_name, photo, course, rating || 5, review, success_story, req.params.id);
  res.json({ success: true });
});

router.delete('/testimonials/:id', authMiddleware, (req, res) => {
  getDB().prepare('DELETE FROM testimonials WHERE id = ?').run(req.params.id);
  res.json({ success: true });
});

// ── Videos CRUD ──────────────────────────────────────────────────────────────

router.get('/videos', authMiddleware, (req, res) => {
  res.json(getDB().prepare('SELECT * FROM videos ORDER BY sort_order, id').all());
});

router.post('/videos', authMiddleware, (req, res) => {
  const { title, youtube_id, thumbnail, description, sort_order } = req.body;
  if (!title || !youtube_id) return res.status(400).json({ error: 'Thiếu tiêu đề hoặc YouTube ID' });
  const finalThumb = thumbnail || `https://img.youtube.com/vi/${youtube_id}/maxresdefault.jpg`;
  const result = getDB().prepare(`INSERT INTO videos (title, youtube_id, thumbnail, description, sort_order)
    VALUES (?, ?, ?, ?, ?)`).run(title, youtube_id, finalThumb, description, sort_order || 0);
  res.json({ id: result.lastInsertRowid });
});

router.put('/videos/:id', authMiddleware, (req, res) => {
  const { title, youtube_id, thumbnail, description, sort_order } = req.body;
  const finalThumb = thumbnail || `https://img.youtube.com/vi/${youtube_id}/maxresdefault.jpg`;
  getDB().prepare(`UPDATE videos SET title=?, youtube_id=?, thumbnail=?, description=?, sort_order=? WHERE id=?`)
    .run(title, youtube_id, finalThumb, description, sort_order || 0, req.params.id);
  res.json({ success: true });
});

router.delete('/videos/:id', authMiddleware, (req, res) => {
  getDB().prepare('DELETE FROM videos WHERE id = ?').run(req.params.id);
  res.json({ success: true });
});

module.exports = router;
