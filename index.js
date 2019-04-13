const db = require('./lib/Connection');
const Users = require('./lib/Users');

const user = new Users();

user.setAttribute('first_name', 'Meat Ball');

console.log(user.first_name);
