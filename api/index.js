const router = require('koa-joi-router');
const { graphqlKoa, graphiqlKoa } = require('apollo-server-koa');

const hello = require('./hello');
const user = require('./user');

const schema = require('./schema');

const publicRoute = router();
const userRoute = router();
const graphqlRoute = router();

publicRoute.route([
  { method: 'GET', path: '/', handler: hello.getHello },
]);

userRoute.prefix('/api');
userRoute.route([
  { method: 'GET', path: '/user/:id', ...user.getOne },
  { method: 'GET', path: '/users', ...user.getAll },
  { method: 'POST', path: '/user', ...user.create },
  { method: 'PUT', path: '/user', ...user.update },
  { method: 'DELETE', path: '/user/:id', ...user.remove }
]);

graphqlRoute.post('/graphql', graphqlKoa({ schema }));
graphqlRoute.get('/graphql', graphqlKoa({ schema }));
graphqlRoute.get('/graphiql', graphiqlKoa({ endpointURL: '/graphql' }));  

module.exports = [ publicRoute, userRoute, graphqlRoute ];