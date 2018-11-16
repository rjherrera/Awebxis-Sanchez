const jsonApiSerializer = require('jsonapi-serializer');
const Koa = require('koa');
const koaBody = require('koa-body');
const koaLogger = require('koa-logger');
const session = require('koa-session');
const mailer = require('./mailers');
const routes = require('./api-routes');
const orm = require('./models');

// App constructor
const app = new Koa();

app.keys = [
  'these secret keys are used to sign HTTP cookies',
  'to make sure only this app can generate a valid one',
  'and thus preventing someone just writing a cookie',
  'saying he is logged in when it\'s really not',
];

// expose ORM through context's prototype
app.context.orm = orm;

app.context.jsonSerializer = function jsonSerializer(type, options) {
  return new jsonApiSerializer.Serializer(type, options);
};

/**
 * Middlewares
 */

// expose running mode in ctx.state
app.use((ctx, next) => {
  ctx.state.env = ctx.app.env;
  return next();
});

// log requests
app.use(koaLogger());

// expose a session hash to store information across requests from same client
app.use(session({
  maxAge: 14 * 24 * 60 * 60 * 1000, // 2 weeks
}, app));

// parse request body
app.use(koaBody({
  multipart: true,
  keepExtensions: true,
}));

mailer(app);

// Routing middleware
app.use(routes.routes());

module.exports = app;
