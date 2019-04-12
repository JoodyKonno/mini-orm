const ActiveOrm = require('./ActiveOrm');

module.exports = class Users extends ActiveOrm {
  constructor() {
    super();
    this.tableName = 'users';
  }
};
