const dotenv = require('dotenv').config();
const fetch = require('node-fetch');
const fs = require('fs');
const http = require('http');

const Error = require('./templates/error.js');
const Page = require('./templates/page.js');

const amTrainId = 'C72916';
const hostname = '127.0.0.1';
const port = 3000;
const publicPath = './public'

const getDepartures = () => {
  return fetch(`http://transportapi.com/v3/uk/train/station/tiploc:STKP/live.json?app_id=${process.env.APP_ID}&app_key=${process.env.APP_KEY}`)
  .then(response => response.json())
  .then(response => response);
};

const index = fs.createWriteStream(`${publicPath}/index.html`);
index.once('open', async () => {
  const data = await getDepartures();
  const morningTrain = data.departures.all.find(train => train.train_uid === amTrainId);
  let html;

  if (typeof morningTrain === 'undefined') {
    html = Error();
  } else {
    const {
      aimed_departure_time: aimedDepartureTime,
      destination_name: destination,
      expected_departure_time: expectedDepartureTime,
      operator_name: operator,
      platform,
      status,
    } = morningTrain;
    html = Page({
      content: {
        aimedDepartureTime,
        destination,
        expectedDepartureTime,
        operator,
        platform,
        status,
      },
      title: status,
    });
  }

  index.end(html);
  console.log('index.html generated');
});

fs.copyFile('src/style.css', `${publicPath}/style.css`, (err) => {
  if (err) throw err;
  console.log('style.css generated');
});

const server = http.createServer(async (req, res) => {
  const request = req.url;
  const filePath = request === '/' ? `${publicPath}/index.html` : `${publicPath}/${request}`;

  fs.readFile(filePath, function(error, content) {
    if (error) {
      res.writeHead(500);
      res.end();
    } else if (request === '/style.css') {
      res.writeHead(200, { 'Content-Type': 'text/css' });
      res.end(content, 'utf-8');
    } else {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(content);
    }
  });
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
