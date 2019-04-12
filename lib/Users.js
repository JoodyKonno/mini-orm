module.exports = class Users {
  constructor() {
    this.tableName = 'users';
  }

  setConnection(db) {
    this.db = db;
  }

  setQueryBuilder(queryBuilder) {
    this.queryBuilder = queryBuilder;
  }

  findAll(params) {
    const query = `
      SELECT 
        *
      FROM ${this.tableName}
      WHERE
        ${this.queryBuilder.where(params)}
    `;

    return new Promise((resolve, reject) => {
      this.db.all(query, this.queryBuilder.bindMap(params), (err, rows) => {
        if (err) {
          reject(err);
        }
        resolve(rows);
      });
    });
  }

  find(params) {
    const query = `
      SELECT 
        *
      FROM ${this.tableName}
      WHERE
        ${this.queryBuilder.where(params)}
    `;

    return new Promise((resolve, reject) => {
      this.db.get(query, this.queryBuilder.bindMap(params), (err, rows) => {
        if (err) {
          reject(err);
        }
        resolve(rows);
      });
    });
  }
};
