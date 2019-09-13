var downloader = require('image-downloader');
var fs = require('fs');
var subreddit = require('./subreddits');
var urlGetter = require('./urlGetter');
var table = require('./checker');

module.exports = {
  //downloads a random image and returns its URL
  getImage: async function() {
    var selectedSubreddit = await subreddit.randomSubreddit();
    var selectedPost = await subreddit.randomPost();
    console.log(
      '* New image was selected from /r/' +
        selectedSubreddit +
        '\r\n* Fetching image...'
    );

    var imageURL;
    //getting the image URL to download later
    imageURL = await urlGetter(selectedSubreddit, selectedPost);

    //only accepts URLs that contain png/jpg files and are not posted before (checked in the hash table)
    while (imageURL === '-1' || table.exists(imageURL[0])) {
      imageURL = await urlGetter(selectedSubreddit, selectedPost);
    }

    console.log(
      '    -> Image successfully fetched!' +
        `\r\n* Image URL: ${imageURL[0]}` +
        `\r\n* Image source: https://www.reddit.com${imageURL[1]}` +
        '\r\n* Downloading Image...'
    );

    //setting download options by specifying URL and destination
    const downloadOptions = {
      url: imageURL[0],
      dest: `./images/x.jpg`
    };

    //downloading image with previous options (Don't bother about the old image, it will be overwritten since all of them have the same name)
    try {
      const { filename, image } = await downloader.image(downloadOptions);
      console.log('-> Image downloaded!');
    } catch (e) {
      console.log('-> Image download failed' + e);
      process.exit();
    }

    //returns the image URL and desc. to be used in tweeter.js (to add URL to hash table when tweet is successfully sent)
    return [imageURL[0], imageURL[2]];
  }
};
