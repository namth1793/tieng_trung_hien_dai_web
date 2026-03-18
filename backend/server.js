require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { initDB } = require('./db/init');

const app = express();
const PORT = process.env.PORT || 5006;

app.use(cors({
  origin: process.env.ALLOWED_ORIGIN
    ? process.env.ALLOWED_ORIGIN.split(',').map(o => o.trim())
    : true,
  credentials: true,
}));
app.use(express.json());

// Init DB (creates tables + seeds if empty)
initDB();

// Routes
app.use('/api/courses', require('./routes/courses'));
app.use('/api/articles', require('./routes/articles'));
app.use('/api/teachers', require('./routes/teachers'));
app.use('/api/testimonials', require('./routes/testimonials'));
app.use('/api/registrations', require('./routes/registrations'));
app.use('/api/videos', require('./routes/videos'));
app.use('/api/admin', require('./routes/admin'));

app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
