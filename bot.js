var Twit = require('twit');
var config = require('./config');
var postTweet = require('./postTweet');

//create a new object from the package and make it public for other modules
var T = new Twit(config);
module.exports.T = T;

console.log(
  '* The bot started successfully!\r\n\r\n-----------------------------------------------'
);

//every 5 hour, a random images will be tweeted
postTweet.tweetImage();
setInterval(postTweet.tweetImage, 18000000);
