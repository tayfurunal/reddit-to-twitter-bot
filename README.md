# ProgrammerMemeBot

ProgrammerMemeBot is a twitter bot that mirrors random post to twitter from [r/ProgrammerHumor](https://www.reddit.com/r/programmerhumor/)

[Live](https://twitter.com/programmermeme_)

## Features

- The bot tweets jpg and png images randomly from given subreddits in any time interval.
- Data is stored in a hash table to prevent tweeting duplicated media.

## Installation

Install the dependencies.

```sh
$ npm install
```

Start the server.

```sh
$ node bot.js
```

## Usage

After cloning this repository, you'll need to take a look on these files:

- **config.js**\
  This file contains the Twitter API keys that can be accessed from [here](https://apps.twitter.com/).

---

- **bot.js**\
  This is the bot's main file. In this file you can specify the interval between every tweet.

---

- **subreddits.js**\
  Enter the names of all the subreddits you want the bot to get and tweet random images from.

---

## Dependencies

- [twit](https://www.npmjs.com/package/twit)
- [node-fetch](https://www.npmjs.com/package/node-fetch)
- [image-downloader](https://www.npmjs.com/package/image-downloader)

## License

[MIT](https://choosealicense.com/licenses/mit/)
