const chalk = require('chalk')
const moment = require('moment')
const morgan = require('morgan')

morgan.token('the-date', () => moment().format('YYYY-MM-DD[T]HH:mm:ss.SSSZZ'))
morgan.token('the-status', (req, res) => {
  let status = morgan.status(req, res) || 0
  let color = status >= 500 ? 'red'
    : status >= 400 ? 'yellow'
    : status >= 300 ? 'cyan'
    : status >= 200 ? 'green' : 'reset'

  return chalk[color](status)
})

module.exports = morgan.bind(null, ':the-date :method HTTP/:http-version :the-status :remote-addr :remote-user :url - :response-time ms')
