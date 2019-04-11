const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('users', sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the in-memory SQlite database.');
});

db.serialize(() => {
  const users = db.get(`
    SELECT * FROM users
  `, [], (err, rows) => {
    if (err) {
      throw err;
    }

    console.log(rows);
  });
});

db.close((err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Close the database connection.');
});
