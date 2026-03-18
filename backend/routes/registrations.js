const express = require('express');
const router = express.Router();
const { getDB } = require('../db/init');

router.post('/', (req, res) => {
  const { name, email, phone, contact_method, study_format, message } = req.body;
  if (!name || !phone) {
    return res.status(400).json({ error: 'Vui lòng điền đầy đủ họ tên và số điện thoại.' });
  }
  const db = getDB();
  const stmt = db.prepare(`
    INSERT INTO registrations (name, email, phone, contact_method, study_format, message)
    VALUES (?, ?, ?, ?, ?, ?)
  `);
  const result = stmt.run(name, email || null, phone, contact_method || null, study_format || null, message || null);
  res.status(201).json({ success: true, id: result.lastInsertRowid, message: 'Đăng ký thành công! Chúng tôi sẽ liên hệ với bạn sớm nhất.' });
});

router.get('/', (req, res) => {
  const db = getDB();
  const registrations = db.prepare('SELECT * FROM registrations ORDER BY created_at DESC').all();
  res.json(registrations);
});

module.exports = router;
