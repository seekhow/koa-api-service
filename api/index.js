const router = require('koa-joi-router');
const hello = require('./hello');
const user = require('./user');

const publicRoute = router();
const userRoute = router();

publicRoute.route([
  { method: 'GET', path: '/', handler: hello.getHello },
]);

userRoute.prefix('/api');
userRoute.route([
  { method: 'GET', path: '/user/:id', ...user.getOne },
  { method: 'GET', path: '/users', ...user.getAll },
  { method: 'POST', path: '/user', ...user.create },
]);

module.exports = [ publicRoute, userRoute ];