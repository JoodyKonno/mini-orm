const ActiveOrm = require('./ActiveOrm');

module.exports = class Groups extends ActiveOrm {
  constructor() {
    super();
    this.tableName = 'groups';

    this.id = null;
    this.name = null;
  }
};
