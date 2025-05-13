const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', // change to your MySQL password
  database: 'inventory_db'
});

db.connect(err => {
  if (err) {
    console.error('DB connection error:', err);
    return;
  }
  console.log('Connected to MySQL DB');
});

// API routes

// Get all items
app.get('/api/items', (req, res) => {
  db.query('SELECT * FROM items', (err, results) => {
    if (err) return res.status(500).json({ error: 'DB query error' });
    res.json(results);
  });
});

// Add a new item
app.post('/api/items', (req, res) => {
  const { name, quantity, price, gst } = req.body;
  const product_code = Math.random().toString(36).substring(2, 10).toUpperCase(); // 8 char alphanumeric
  const total_price = ((price + (price * gst / 100)) * quantity).toFixed(2);

  const sql = 'INSERT INTO items (name, quantity, price, gst, product_code, total_price) VALUES (?, ?, ?, ?, ?, ?)';
  db.query(sql, [name, quantity, price, gst, product_code, total_price], (err, result) => {
    if (err) return res.status(500).json({ error: 'Insert error', details: err });
    res.json({ id: result.insertId, name, quantity, price, gst, product_code, total_price });
  });
});

// Update an item
app.put('/api/items/:id', (req, res) => {
  const { name, quantity, price, gst } = req.body;
  const total_price = ((price + (price * gst / 100)) * quantity).toFixed(2);
  const sql = 'UPDATE items SET name=?, quantity=?, price=?, gst=?, total_price=? WHERE id=?';
  db.query(sql, [name, quantity, price, gst, total_price, req.params.id], (err, result) => {
    if (err) return res.status(500).json({ error: 'Update error', details: err });
    res.json({ success: true });
  });
});

// Delete an item
app.delete('/api/items/:id', (req, res) => {
  const sql = 'DELETE FROM items WHERE id=?';
  db.query(sql, [req.params.id], (err, result) => {
    if (err) return res.status(500).json({ error: 'Delete error', details: err });
    res.json({ success: true });
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
