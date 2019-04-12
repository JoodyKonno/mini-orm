module.exports = class Users {
  constructor() {
    this.tableName = 'users';
  }

  setConnection(db) {
    this.db = db;
  }

  findAll() {
    const query = `
      SELECT 
        *
      FROM users
    `;

    return new Promise((resolve, reject) => {
      this.db.all(query, [], (err, rows) => {
        if (err) {
          reject(err);
        }
        resolve(rows);
      });
    });
  }

  find(params) {
    const whereString = Object.keys(params)
      .map(field => `${field} = :${field}`)
      .join(' ');

    const queryParams = Object.keys(params)
      .reduce((map, field) => {
        map[`:${field}`] = params[field];
        return map;
      }, {});

    const query = `
      SELECT 
        *
      FROM users
      WHERE
        ${whereString}
    `;

    return new Promise((resolve, reject) => {
      this.db.get(query, queryParams, (err, rows) => {
        if (err) {
          reject(err);
        }
        resolve(rows);
      });
    });
  }
};
