const ActiveOrm = require('./ActiveOrm');

module.exports = class Users extends ActiveOrm {
  constructor() {
    super();
    this.tableName = 'users';

    this.id = null;
    this.group_id = null;
    this.first_name = null;
    this.last_name = null;
    this.email = null;
  }
};
