const express = require('express'); // Imports Express
const sqlite3 = require('sqlite3').verbose(); // Imports SQLite3 in verbose mode for logging purposes
const cors = require('cors');

const app = express(); // Creates web server app

const path = require('path');
const dbPath = path.resolve(__dirname, 'histobowl.db');
const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE, (err) => {
  if (err) console.error('Database connection error:', err.message);
  else console.log('Connected to the SQLite database at:', dbPath);
});

app.use(cors());

app.listen(8000, () => {
  console.log("HistoBowl server is running on port 8000.") // Starts server on port 8000; logs if successful
});

app.get('/api/tournaments', (req, res) => {
  const sql = 'SELECT * FROM tournaments'; // Build command to execute

  db.all(sql, [], (err, rows) => { // Executes command on DB
    if (err) {
      res.status(500).json({ error: err.message }); // Return error message if encountered
      return;
    }
    res.json(rows); // Converts data in JSON
  })
})