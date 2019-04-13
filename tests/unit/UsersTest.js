/* global describe it xit expect before beforeEach after afterEach context */
const db = require('../../lib/Connection');
const queryBuilder = require('../../lib/QueryBuilder');

const User = require('../../lib/Users');

const user = new User();
user.setConnection(db);
user.setQueryBuilder(queryBuilder);

describe('Users', () => {
  beforeEach((done) => {
    db.run(`
      CREATE TABLE groups (
        id INTEGER PRIMARY KEY,
        name TEXT
      )`, () => {
      done();
    });
  });

  beforeEach((done) => {
    db.run(`
      CREATE TABLE users (
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
      INSERT INTO groups (name)
      VALUES ('Binding of Isaac'),
      ('Super Meat Boy')`, () => {
      done();
    });
  });

  beforeEach((done) => {
    db.run(`
      INSERT INTO users (group_id, first_name, last_name, email)
      VALUES (2, 'Meat', 'Ball', 'meatball@meat.com'),
      (2, 'Big', 'Fetus', 'bigfetus@meat.com'),
      (2, 'Band', 'Aid', 'bandaid@meat.com')`, () => {
      done();
    });
  });

  afterEach((done) => {
    db.serialize(() => {
      db.run(`
        DROP TABLE users
      `, () => {
        done();
      });
    });
  });

  afterEach((done) => {
    db.serialize(() => {
      db.run(`
        DROP TABLE groups
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
          group_id: 2,
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
        group_id: 2,
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

  describe('save()', () => {
    before(() => {
      user
        .setAttribute('group_id', 2)
        .setAttribute('first_name', 'Might')
        .setAttribute('last_name', 'Saw')
        .setAttribute('email', 'mightsaw@meat.com');
    });

    after((done) => {
      db.serialize(() => {
        db.run(`
          DELETE FROM users
          WHERE id = 4
        `, () => {
          done();
        });
      });
    });

    it('saves a new user', async () => {
      const output = await user.save();
      const expectedOutput = {
        id: 4,
        group_id: 2,
        first_name: 'Might',
        last_name: 'Saw',
        email: 'mightsaw@meat.com',
      };

      expect(output).to.deep.equals(expectedOutput);
    });
  });
});
