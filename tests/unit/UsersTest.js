/* global describe it xit expect beforeEach afterEach context */
const db = require('../../lib/Connection');
const User = require('../../lib/Users');

const user = new User();
user.setConnection(db);

describe('Users', () => {
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
    it('returns all the results', async () => {
      const expectedOutput = [
        {
          id: 1,
          first_name: 'Meat',
          last_name: 'Ball',
          email: 'meatball@meat.com',
        },
        {
          id: 2,
          first_name: 'Big',
          last_name: 'Fetus',
          email: 'bigfetus@meat.com',
        },
        {
          id: 3,
          first_name: 'Band',
          last_name: 'Aid',
          email: 'bandaid@meat.com',
        },
      ];

      const output = await user.findAll();

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
