# fetch-instagram [![CircleCI](https://circleci.com/gh/ChalkPE/fetch-instagram.svg?style=svg)](https://circleci.com/gh/ChalkPE/fetch-instagram) [![license](https://img.shields.io/github/license/ChalkPE/fetch-instagram.svg)](LICENSE) [![Standard - JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
Fetch recent images on Instagram by tag

## Usage
```bash
$ npm install && npm start
$ curl http://localhost:2409/wow
{
  "ok": true,
  "date": "2017-05-18T10:19:43.428Z",
  "result": [
    {
      "image": "https://scontent-lht6-1.c…711036_n.jpg",
      "link": "https://www.instagram.com/p/BUOuPvNvgMO/",
      "tags": ["wow", "awesome", "yay"],
      "text": "Hello world #wow #awesome #yay"
    }
  ]
}
```

### License
[MIT](LICENSE)
