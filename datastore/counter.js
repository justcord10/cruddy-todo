const fs = require('fs');
const path = require('path');
const sprintf = require('sprintf-js').sprintf;

//should not use this???
var counter = 0;

// Private helper functions ////////////////////////////////////////////////////

// Zero padded numbers can only be represented as strings.
// If you don't know what a zero-padded number is, read the
// Wikipedia entry on Leading Zeros and check out some of code links:
// https://www.google.com/search?q=what+is+a+zero+padded+number%3F

const zeroPaddedNumber = (num) => {
  return sprintf('%05d', num);
};

const readCounter = (callback) => {
  fs.readFile(exports.counterFile, (err, fileData) => {
    if (err) {
      callback(null, 0);
    } else {
      callback(null, Number(fileData));
    }
  });
};

const writeCounter = (count, callback) => {
  var counterString = zeroPaddedNumber(count);
  fs.writeFile(exports.counterFile, counterString, (err) => {
    if (err) {
      throw ('error writing counter');
    } else {
      callback(null, counterString);
    }
  });
};

// Public API - Fix this function //////////////////////////////////////////////


exports.getNextUniqueId = (callback) => {
  // counter = counter + 1;
  readCounter((err, count) => {
    writeCounter(count + 1, callback);
  });
  // return zeroPaddedNumber(counter);
};


// Configuration -- DO NOT MODIFY //////////////////////////////////////////////

exports.counterFile = path.join(__dirname, 'counter.txt');

// var persistentCounter = 0;
// readCounter((err, num) => {
//   persistentCounter = num + 1;
// });

// return setTimeOut(() => { zeroPaddedNumber(persistentCounter); }, 2000);