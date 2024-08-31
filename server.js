require('dotenv').config();
const express = require('express');
const path = require('path');
const app = express();
const cors = require('cors');


const { getCurrentDateTime, now } = require('./funcs/datetime.js');

const {
  dryerController,
  getDryerState,
  getSavedTime,
  getSystemHealth,
} = require('./funcs/dryer.js');

const port = process.env.PORT;
console.log(__dirname);
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

console.log(getCurrentDateTime());

app.get('/', (req, res) => {
  console.log(`request for index @ ${getCurrentDateTime()}`);
  res.sendFile(path.join(__dirname, 'view', 'index.html'));
});

app.get('/faq', (req, res) => {
  res.sendFile(path.join(__dirname, 'view', 'faq.html'));
  console.log(`request for faq @ ${getCurrentDateTime()}`);
});

app.get('/systemHealth', (req, res) => {
  res.sendFile(path.join(__dirname, 'view', 'systemHealth.html'));
  console.log(`request for system health @ ${getCurrentDateTime()}`);
});

app.post('/value/:v', dryerController);

app.get('/dryer', (req, res) => {
  res.send({
    dryerState: getDryerState(),
    savedTime: getSavedTime(),
  });
  //console.log(`request for dryer state @ ${getCurrentDateTime()}`);
});

app.get('/health', (req, res) => {
  res.send({
    systemHealth: getSystemHealth(),
  });
  //console.log(`request for system health @ ${getCurrentDateTime()}`);
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
