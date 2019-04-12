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
      CREATE TABLE IF NOT EXISTS users(
        id INTEGER PRIMARY KEY,
        group_id INTEGER,
        first_name TEXT,
        last_name TEXT,
        email TEXT
      )`, () => {
      done();
    });
  });

  beforeEach((done) => {
    db.run(`
      CREATE TABLE IF NOT EXISTS groups(
        id INTEGER PRIMARY KEY,
        first_name TEXT
      )`, () => {
      done();
    });
  });

  beforeEach((done) => {
    db.run(`
      INSERT INTO groups (name)
      VALUES ('Super Meat Boy'),`, () => {
      done();
    });
  });

  beforeEach((done) => {
    db.run(`
      INSERT INTO users (group_id, first_name, last_name, email)
      VALUES (1, 'Meat', 'Ball', 'meatball@meat.com'),
      (1, 'Big', 'Fetus', 'bigfetus@meat.com'),
      (1, 'Band', 'Aid', 'bandaid@meat.com')`, () => {
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

  afterEach((done) => {
    db.serialize(() => {
      db.run(`
        DELETE FROM groups 
      `, () => {
        done();
      });
    });
  });

  describe('findAll()', () => {
    it('returns all the results for the given query', async () => {
      const expectedOutput = [
        {
          id: 2,
          group_id: 1,
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
        group_id: 1,
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
