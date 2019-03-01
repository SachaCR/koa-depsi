
# Koa-depsi

This package allow you to easily inject dependencies in your koa app.
In the example below we inject a database connection. This allow us to call the database from our handlers by using the `ctx.deps.db` object.

Of course injecting dependencies is usefull in testing context. This middleware will allow you to inject a fake db client through your Koa application to avoid calling a real database in your routes.

`/app.js`

```js
const Koa = require('koa')
const koadepsi = require('koa-depsi')

function createApp(dependencies = {}) {
  const app = new Koa()

  /**
   * This will expose the object dependencies on the koa context : ctx.deps
   */
  app.use(koadepsi(dependencies))

  /**
   * If you use koa-router you can inject dependencies on specific routes only
   */
  const Router = require('koa-router');
  const router = new Router();
  router.use('/products', koadepsi(dependencies.productsController))

  return app
}

module.exports = createApp
```

`/index.js`

```js
const database = require('whatever-db-you-want')
const app = require('./app')

const dependencies = { db: database }

app(dependencies).listen()
```

`/routes/users/getById.js`

```js
async function getUserById(ctx) {
  /**
   * Here you can retrieve your database connection from the Koa context
   */
  const db = ctx.deps.db
  const user = await db.user.getById(ctx.params.id)
  ctx.status = 200
  ctx.body = { user }
}

module.exports = getUserById
```
