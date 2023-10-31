const fs = require('fs');
const path = require('path');
const _ = require('underscore');
const counter = require('./counter');

var items = {};

// Public API - Fix these CRUD functions ///////////////////////////////////////

exports.create = (text, callback) => {
  //reading and writing a file,
  counter.getNextUniqueId((err, id) => {
    fs.writeFile(`${exports.dataDir}/${id}.txt`, text, (err) => {
      if (err) {
        throw ('error thrown in saving todo in file');
      } else {
        callback(null, { id, text });
      }
    });
  });
};

exports.readAll = (callback) => {
  fs.readdir(exports.dataDir, (err, dirData) => {
    if (err) {
      throw err;
    } else {
      var data = _.map(dirData, (id) => {
        var name = id.substring(0, id.length - 4);
        return { text: name, id: name };
      });
      callback(null, data);
    }
  });

};

exports.readOne = (id, callback) => {
  fs.readFile(`${exports.dataDir}/${id}.txt`, 'utf8', (err, text) => {
    if (!text) {
      callback(new Error(`No item with id: ${id}`));
    } else {
      console.log(text);
      callback(null, { id, text });
    }
  });
};

exports.update = (id, text, callback) => {
  fs.readdir(exports.dataDir, (err, list) => {
    if (err) {
      throw ('error');
    } else if ( !list.includes(`${id}.txt`) ) {
      callback(new Error('id not in list'));
    } else {
      fs.writeFile(`${exports.dataDir}/${id}.txt`, text, (err) => {
        if (err) {
          throw ('error thrown in updating todo in file');
        } else {
          callback(null, { id, text });
        }
      });
    }
  });
};

exports.delete = (id, callback) => {
  fs.unlink(`${exports.dataDir}/${id}.txt`, (err) => {
    if (err) {
    // report an error if item not found
      callback(new Error(`No item with id: ${id}`));
    } else {
      callback();
    }
  });
};


// Config+Initialization code -- DO NOT MODIFY /////////////////////////////////

exports.dataDir = path.join(__dirname, 'data');

exports.initialize = () => {
  if (!fs.existsSync(exports.dataDir)) {
    fs.mkdirSync(exports.dataDir);
  }
};
