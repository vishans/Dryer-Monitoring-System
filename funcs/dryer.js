const { now } = require('./datetime');
const { appendDataToFile } = require('./storage');

let dryerState = undefined;
let lastDryerState = 0;
let savedTime = now();

let t = 0;
let lastT = 0;
let systemHealth = 0;

exports.dryerController = async (req, res) => {
  res.send();
  const v = req.params.v;
  lastDryerState = dryerState;
  dryerState = v;

  lastT = t;
  t = now();

  systemHealth = 1;
  if (t - lastT > parseInt(process.env.SYS_DOWN_TIME, 10)) {
    systemHealth = 0;
  }

  if (dryerState != lastDryerState) {
    savedTime = now();

    appendDataToFile(dryerState, savedTime, Boolean(process.env.FORMAT_DATE));
  }
};

// Getter functions to access the latest values
exports.getDryerState = () => dryerState;
exports.getSavedTime = () => savedTime;
exports.getSystemHealth = () => systemHealth;
