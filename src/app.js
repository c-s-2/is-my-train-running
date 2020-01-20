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

const error = fs.createWriteStream(`${publicPath}/error.html`);
error.once('open', function(fd) {
  error.end(Error());
  console.log('public/error.html generated');
});

fs.copyFile('src/style.css', `${publicPath}/style.css`, (err) => {
  if (err) throw err;
  console.log('public/style.css generated');
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

  // if (request === './style.css') {
  //   const fileStream = fs.createReadStream(`${publicPath}/style.css`);
  //   fileStream.pipe(res);
  //   return;
  // } else {
  //   const fileStream = fs.createReadStream(`${publicPath}/error.html`);
  //   fileStream.pipe(res);
  //   return;
  // }
  // const path = req.url;
  // const data = await getDepartures();
  // const morningTrain = data.departures.all.find(train => train.train_uid === amTrainId);
  // let html;
  //
  // if (typeof morningTrain === 'undefined') {
  //   html = Error();
  // } else {
  //   const {
  //     aimed_departure_time: aimedDepartureTime,
  //     destination_name: destination,
  //     expected_departure_time: expectedDepartureTime,
  //     operator_name: operator,
  //     platform,
  //     status,
  //   } = morningTrain;
  //   html = Template({
  //     content: {
  //       aimedDepartureTime,
  //       destination,
  //       expectedDepartureTime,
  //       operator,
  //       platform,
  //       status,
  //     },
  //     title: status,
  //   });
  // }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
