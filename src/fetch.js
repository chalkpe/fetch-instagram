const puppeteer = require('puppeteer')
const base = 'https://www.instagram.com'

module.exports = async tag => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()

  await page.goto(`${base}/explore/tags/${tag}/`)
  await page.waitForSelector('article', { timeout: 10000 })

  const posts = await page.evaluate(parse, base)
  await browser.close()

  return { tag, posts, date: new Date() }
}

function parse (base) {
  const query = 'article > div:nth-of-type(2) a[href^="/p/"]'
  const pictures = Array.prototype.slice.call(document.querySelectorAll(query))

  return pictures.map(a => {
    const img = a.querySelector('img[src]')
    const text = (img.getAttribute('alt') || '').trim()

    return {
      text,
      image: img.getAttribute('src'),
      link: `${base}${a.getAttribute('href')}`,
      tags: (text.match(/#([^\s#]+)/g) || []).map(tag => tag.slice(1))
    }
  })
}
