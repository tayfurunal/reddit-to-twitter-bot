var table = require('./checker');
var fs = require('fs');
var main = require('./bot');
var downloader = require('./downloader');

module.exports = {
  tweetImage: async function() {
    var url = await downloader.getImage();
    var b64 = fs.readFileSync('./images/x.jpg', { encoding: 'base64' });

    console.log('* Uploading image...');

    main.T.post('media/upload', { media_data: b64 }, function(
      err,
      data,
      response
    ) {
      var mediaId = data.media_id_string;

      main.T.post('media/metadata/create', { media_id: mediaId }, function(
        err,
        data,
        response
      ) {
        if (!err) {
          console.log('-> Image uploaded!\r\n* Sending tweet...');
          var params = { status: url[1], media_ids: [mediaId] };
          main.T.post('statuses/update', params, function(err, data, response) {
            if (err) {
              console.log(
                `-> Error sending tweet!\r\n -> ${new Date().getDate()}/${new Date().getMonth() +
                  1}/${new Date().getFullYear()},${new Date()
                  .toLocaleString()
                  .split(',')
                  .pop()}\r\n----------------------------------------------------------`
              );

              process.exit();
              return;
            }

            //URLs add table for same check
            table.add(url[0]);

            console.log(
              `-> Tweet sent!\r\n  -> ${new Date().getDate()}/${new Date().getMonth() +
                1}/${new Date().getFullYear()},${new Date()
                .toLocaleString()
                .split(',')
                .pop()}\r\n----------------------------------------------------------`
            );

            return;
          });
        } else {
          console.log(err);
          console.log('-> Error uploading image!');

          process.exit();
          return;
        }
      });
    });
  }
};
