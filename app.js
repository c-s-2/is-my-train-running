const http = require('http');
const fetch = require('node-fetch');
const fs = require('fs');
const Template = require('./template.js');

const hostname = '127.0.0.1';
const port = 3000;

const amTrainId = "C72916";

const getTrains = () => {
  return fetch('http://transportapi.com/v3/uk/train/station/tiploc:STKP/live.json?app_id=[id]&app_key=[key]')
  .then(response => response.json())
  .then(response => response);
};

const server = http.createServer((req, res) => {
  const path = req.url;

  if (path === '/style.css') {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/css');
    res.write(fs.readFileSync('./style.css', { encoding: 'utf8' }));
    res.end();
  } else {
    const data = await getTrains();
    const morningTrain = data.departures.all.find(train => train.train_uid === morningId);
    const {
      aimed_departure_time: aimedDepartureTime,
      destination_name: destination,
      expected_departure_time: expectedDepartureTime,
      operator_name: operator,
      platform,
      status,
    } = morningTrain;
    const html = Template({
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
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end(html);
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
