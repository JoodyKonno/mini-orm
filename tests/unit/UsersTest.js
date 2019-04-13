/* global describe it xit expect beforeEach afterEach context */
const db = require('../../lib/Connection');
const queryBuilder = require('../../lib/QueryBuilder');

const User = require('../../lib/Users');

const user = new User();
user.setConnection(db);
user.setQueryBuilder(queryBuilder);

describe('Users', () => {
  beforeEach((done) => {
    db.run(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY,
        first_name TEXT,
        last_name TEXT,
        email TEXT
      )`, () => {
      done();
    });
  });

  beforeEach((done) => {
    db.run(`
      INSERT INTO users (first_name, last_name, email)
      VALUES ('Meat', 'Ball', 'meatball@meat.com'),
      ('Big', 'Fetus', 'bigfetus@meat.com'),
      ('Band', 'Aid', 'bandaid@meat.com')`, () => {
      done();
    });
  });

  afterEach((done) => {
    db.serialize(() => {
      db.run(`
        DELETE FROM users
      `, () => {
        done();
      });
    });
  });

  // xit for ignore tests for now
  xit('is an ActiveOrm class', () => {

  });

  describe('findAll()', () => {
    it('returns all the results for the given query', async () => {
      const expectedOutput = [
        {
          id: 2,
          first_name: 'Big',
          last_name: 'Fetus',
          email: 'bigfetus@meat.com',
        },
      ];

      const output = await user.findAll({ id: 2 });

      expect(output).to.deep.equal(expectedOutput);
    });
  });

  describe('find()', () => {
    it('returns a single result', async () => {
      const expectedOutput = {
        id: 2,
        first_name: 'Big',
        last_name: 'Fetus',
        email: 'bigfetus@meat.com',
      };

      const output = await user.find({ id: 2 });

      expect(output).to.deep.equal(expectedOutput);
    });

    context('when it does not have records', () => {
      xit('returns empty', () => {

      });
    });
  });
});
