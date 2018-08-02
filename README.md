# fetch-instagram [![license](https://img.shields.io/github/license/ChalkPE/fetch-instagram.svg)](LICENSE) [![Standard - JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
Fetch recent posts on Instagram by tag

## Usage
```bash
$ yarn && yarn start
$ curl http://localhost:2409/foo+bar
{
  "url": "foo+bar",
  "result": [
    {
      "tag": "foo",
      "posts": [
        {
          "text": "Hello world #foo #awesome #yay",
          "image": "https://scontent-lht6-1.c…711036_n.jpg",
          "link": "https://www.instagram.com/p/BUOuPvNvgMO/",
          "tags": ["foo", "awesome", "yay"]
        }
      ],
      "date": "2018-08-02T20:56:37.458Z"
    },
    {
      "tag": "bar",
      "posts": [
        {
          "text": "Test #bar #sigong #joa",
          "image": "https://scontent-lht6-1.c…421227_n.jpg",
          "link": "https://www.instagram.com/p/BUQNzCchWoC/",
          "tags": ["bar", "sigong", "joa"]
        }
      ],
      "date": "2018-08-02T20:56:37.458Z"
    }
  ]
}
```

### License
[MIT](LICENSE)
