const table = require('./checker');
const fs = require('fs');
const main = require('./bot');
const downloader = require('./downloader');

module.exports = {
  tweetImage: async function() {
    let url = await downloader.getImage();
    let b64 = fs.readFileSync('./images/x.jpg', { encoding: 'base64' });

    console.log('* Uploading image...');

    main.T.post('media/upload', { media_data: b64 }, function(
      err,
      data,
      response
    ) {
      let mediaId = data.media_id_string;

      main.T.post('media/metadata/create', { media_id: mediaId }, function(
        err,
        data,
        response
      ) {
        if (!err) {
          console.log('-> Image uploaded!\r\n* Sending tweet...');
          let params = { status: url[1], media_ids: [mediaId] };
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
