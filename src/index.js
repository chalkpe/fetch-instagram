const path = require('path')
const exec = require('child_process').exec

const root = path.resolve(__dirname, '..')
const source = path.resolve(root, 'dist', 'fetch.js')
const phantom = path.resolve(root, 'node_modules', '.bin', 'phantomjs')

const express = require('express')
const logger = require('./logger')
const cors = require('cors')

const app = express()
  .use(cors())
  .use(logger())

app.get('/:tag', (req, res) => {
  const tag = encodeURIComponent(req.params.tag)
  exec(`${phantom} ${source} ${tag}`, (err, out) =>
    res.json(err ? { ok: false, message: err.message } : JSON.parse(out)))
})

const port = process.env.PORT || '2409'
app.listen(port, () => console.log(`Listening on port ${port}`))
