const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('users', (err) => {
  if (err) {
    console.error(err.message);
  } else {
    console.log('Connected to the in-memory SQlite database.');
  }
});

db.serialize(() => {
  db.run(`
    CREATE TABLE users (
      id INTEGER PRIMARY KEY,
      first_name TEXT,
      last_name TEXT,
      email TEXT
    )`);
  db.run(`
    INSERT INTO users (first_name, last_name, email)
    VALUES ('Meat', 'Ball', 'meatball@meat.com'),
    ('Big', 'Fetus', 'bigfetus@meat.com'),
    ('Band', 'Aid', 'bandaid@meat.com')`);
});

db.close((err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Close the database connection.');
});
