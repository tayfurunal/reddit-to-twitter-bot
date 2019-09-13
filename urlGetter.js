var fetch = require('node-fetch');

const getURL = function(subreddit, postNumber) {
  return new Promise((resolve, reject) => {
    fetch(`https://www.reddit.com/r/${subreddit}/hot.json?limit=5`)
      .then(res => res.json())
      .then(json => {
        let image;
        let oldImage;
        let crossParent;
        let permalink;
        console.log(postNumber);
        try {
          image = json.data.children[postNumber].data.url;
          crossParent = json.data.children[postNumber].data.crosspost_parent;
          permalink = json.data.children[postNumber].data.permalink;
          title = json.data.children[postNumber].data.title;
        } catch (error) {
          image = json.data.children[postNumber].data.url;
          crossParent = json.data.children[postNumber].data.crosspost_parent;
          permalink = json.data.children[postNumber].data.permalink;
          title = json.data.children[postNumber].data.title;
        }

        //returns -1 if it doesn't find a non-crossposted jpg/png image
        if (!image) return resolve('-1');

        if (crossParent) return resolve('-1');

        let extension = image.substring(
          image.lastIndexOf('.') + 1,
          image.lastIndexOf('.') + 4
        );

        if (extension != 'jpg' && extension != 'png') return resolve('-1');

        return resolve([image, permalink, title]);
      })
      .catch(err => {
        return resolve('-1');
      });
  });
};

module.exports = getURL;
