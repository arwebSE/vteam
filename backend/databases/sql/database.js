// database.js
const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database(__dirname + '/backenddata.db', (err) => {
  if (err) {
    console.error('Database connection error:', err.message);
  } else {
    console.log('Connected to the SQLite database.');
  }
});

module.exports = db;