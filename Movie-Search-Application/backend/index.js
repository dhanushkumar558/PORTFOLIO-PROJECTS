const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

console.log('🔥 index.js starting...');

const app = express();
app.use(cors());
app.use(express.json());

// DB connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',     // your MySQL password here
  database: 'moviesa'
});

db.connect((err) => {
  if (err) {
    console.error('❌ MySQL connection failed:', err.message);
    process.exit(1); // exit if DB fails
  } else {
    console.log('✅ Connected to MySQL!');
  }
});

// Just a test route
app.get('/', (req, res) => {
  res.send('🚀 Backend is working!');
});

// Your movies API route
app.post('/api/movies', (req, res) => {
  const { industry, year, actor, rating, genre } = req.body;

  let query = 'SELECT * FROM movies WHERE 1=1';
  const params = [];

  if (industry) {
    query += ' AND industry = ?';
    params.push(industry);
  }
  if (year) {
    query += ' AND year = ?';
    params.push(year);
  }
  if (actor) {
    query += ' AND actor LIKE ?';
    params.push(`%${actor}%`);
  }
  if (rating) {
    query += ' AND rating >= ?';
    params.push(rating);
  }
  if (genre) {
    query += ' AND genre = ?';
    params.push(genre);
  }

  db.query(query, params, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

app.listen(5000, () => {
  console.log('🌍 Server running on http://localhost:5000');
});
