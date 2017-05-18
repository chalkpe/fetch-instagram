/* eslint-env phantomjs */

import system from 'system'
import webpage from 'webpage'

function main () {
  if (system.args.length <= 1) return write(1, 'insufficient arguments')
  const url = `https://www.instagram.com/explore/tags/${system.args[1]}/`

  const page = webpage.create()
  page.settings.userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36'

  page.open(url, status => (status !== 'success')
    ? write(1, { message: `Unable to load the url ${url}` })
    : setTimeout(() => write(0, { date: new Date(), result: page.evaluate(parse) }), 500))
}

function write (exitCode, data) {
  console.log(JSON.stringify({ ok: exitCode === 0, ...data }))
  phantom.exit(exitCode)
}

function parse () {
  const $ = (query, element = document) =>
    Array.prototype.slice.call(element.querySelectorAll(query))

  return $('a[href^="/p/"]', $('article > div').pop()).map(a => {
    const img = $('img[id^="pImage"]', a).pop()
    const text = (img.getAttribute('alt') || '').trim()

    return {
      text,
      image: img.getAttribute('src'),
      link: 'https://www.instagram.com' + a.getAttribute('href'),
      tags: (text.match(/#([^\s#]+)/g) || []).map(tag => tag.slice(1))
    }
  })
}

main()
