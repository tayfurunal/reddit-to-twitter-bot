const fs = require('fs');

if (fs.existsSync('./data/data.json') == false)
  fs.appendFileSync('./data/data.json', '{}');

const map = JSON.parse(fs.readFileSync('./data/data.json', 'utf8'));

module.exports = {
  generateKey: function(url) {
    return url.slice(url.lastIndexOf('/') + 1, url.lastIndexOf('.'));
  },

  //checks if the URL already exists in the hash table to prevent duplication
  exists: function(url) {
    if (map[this.generateKey(url)]) return true;

    return false;
  },

  add: function(url) {
    if (this.exists(url)) return;

    map[this.generateKey(url)] = 1;

    let stat = fs.statSync('./data/data.json');

    fs.truncateSync('./data/data.json', stat.size - 1);
    fs.appendFileSync(
      './data/data.json',
      `${stat.size == 2 ? '' : ','}"${this.generateKey(url)}":1}`
    );
  }
};
