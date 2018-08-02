const Koa = require('koa')
const cors = require('@koa/cors')
const fetch = require('./fetch')
const port = process.env.PORT || '2409'

new Koa()
  .use(cors())
  .use(async (ctx, next) => {
    const url = decodeURIComponent(ctx.url.slice(1))
    await Promise.all(url.split('+').map(fetch))
      .then(result => (ctx.body = { url, result }))
      .catch(err => ctx.throw(404, err.message, err.stack))
  })
  .listen(port, () => console.log(`Listening on port ${port}`))
