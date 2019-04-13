module.exports = class ActiveOrm {
  setConnection(db) {
    this.db = db;
  }

  setQueryBuilder(queryBuilder) {
    this.queryBuilder = queryBuilder;
  }

  setAttribute(key, value) {
    this[`db_${key}`] = value;
    return this;
  }

  getAttribute(key) {
    return this[`db_${key}`];
  }

  getAttributes() {
    return Object.keys(this)
      .filter(property => property.startsWith('db_'))
      .map(property => property.replace('db_', ''))
      .reduce((result, property) => {
        result[property] = this.getAttribute(property);
        return result;
      }, {});
  }

  getDbFields() {
    return Object.keys(this)
      .filter(property => property.startsWith('db_'))
      .map(property => property.replace('db_', ''));
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

  save() {
    const attributes = this.getAttributes();

    const fields = Object.keys(attributes)
      .filter(field => field !== 'id');
    const values = Object.keys(attributes)
      .filter(field => field !== 'id')
      .map(field => this.getAttribute(field), this);

    const query = `
      INSERT INTO ${this.tableName}
        (${fields.join(', ')})
      VALUES
        (${values.map(() => '?').join(', ')})
    `;

    return new Promise((resolve, reject) => {
      this.db.serialize(() => {
        this.db.run(query, values, function (err) {
          if (err) {
            reject(err);
          }

          attributes.id = this.lastID;

          resolve(attributes);
        });
      });
    });
  }
};
