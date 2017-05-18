/* eslint-env phantomjs */

import webpage from 'webpage'
import webserver from 'webserver'

webserver.create().listen(2409, (req, res) => {
  if (req.url === '/favicon.ico') return

  const page = webpage.create()
  page.settings.userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36'

  console.log(decodeURIComponent(req.url))
  res.setHeader('Content-Type', 'application/json')

  page.open('https://www.instagram.com/explore/tags' + req.url, status => {
    if (status !== 'success') {
      res.statusCode = 500
      res.write(JSON.stringify({
        ok: false,
        message: `Unable to load ${req.url}`
      }))

      return res.close()
    }

    setTimeout(() => {
      res.statusCode = 200
      res.write(JSON.stringify({
        ok: true,
        date: new Date(),
        result: page.evaluate(parse)
      }))

      return res.close()
    }, 500)
  })
})

function parse () {
  const $ = (query, element = document) =>
    Array.prototype.slice.call(element.querySelectorAll(query))

  const recent = $('article > div').pop()
  const pictures = $('a[href^="/p/"]', recent)

  return pictures.map(a => {
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
