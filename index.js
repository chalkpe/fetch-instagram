const express = require('express')
const exec = require('child_process').exec
const logger = require('./logger')

const app = express().use(logger())

app.get('/:tag', (req, res, next) => {
  const tag = encodeURIComponent(req.params.tag)
  const command = `./node_modules/.bin/phantomjs phantom.js`

  exec(`${command} ${tag}`, (err, stdout) => {
    if (!err) res.json(JSON.parse(stdout))
    else res.json({ ok: false, message: err.message })
  })
})

app.listen(2409, () => console.log('Listening on port 2409'))
