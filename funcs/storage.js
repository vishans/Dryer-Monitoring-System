const {
  getCurrentMonthAndYear,
  unixTimeToHumanReadableDate,
} = require('./datetime');

const fs = require('fs');

exports.appendDataToFile = (dryterState, time, formatTime = false) => {
  const directory = 'data';
  const fileName = directory + '/' + getCurrentMonthAndYear() + '.txt';
  let data;

  if (formatTime) {
    data = dryterState + ' ' + unixTimeToHumanReadableDate(time) + '\n';
  } else {
    data = dryterState + ' ' + time + '\n';
  }

  fs.appendFile(fileName, data, 'utf8', (err) => {
    if (err) {
      console.log('An error occurred, ', err);
    }
  });
};
