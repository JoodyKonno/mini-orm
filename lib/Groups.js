const ActiveOrm = require('./ActiveOrm');

module.exports = class Groups extends ActiveOrm {
  constructor() {
    super();
    this.tableName = 'groups';
  }
};
