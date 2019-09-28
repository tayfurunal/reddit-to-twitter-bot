const Twit = require('twit');
const config = require('./config');
const postTweet = require('./postTweet');

//create a new object from the package and make it public for other modules
const T = new Twit(config);
module.exports.T = T;

console.log(
  '* The bot started successfully!\r\n\r\n-----------------------------------------------'
);

//every 5 hour, a random images will be tweeted
postTweet.tweetImage();
setInterval(postTweet.tweetImage, 18000000);
