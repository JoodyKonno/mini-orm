const ActiveOrm = require('./ActiveOrm');

module.exports = class Users extends ActiveOrm {
  constructor() {
    super();
    this.tableName = 'users';

    this.db_id = null;
    this.db_group_id = null;
    this.db_first_name = null;
    this.db_last_name = null;
    this.db_email = null;
  }
};
