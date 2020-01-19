const dotenv = require('dotenv').config();
const fetch = require('node-fetch');
const fs = require('fs');
const http = require('http');

const Error = require('./error.js');
const Template = require('./template.js');

const amTrainId = "C72916";
const hostname = '127.0.0.1';
const port = 3000;

const getDepartures = () => {
  return fetch(`http://transportapi.com/v3/uk/train/station/tiploc:STKP/live.json?app_id=${process.env.APP_ID}&app_key=${process.env.APP_KEY}`)
  .then(response => response.json())
  .then(response => response);
};

const server = http.createServer(async (req, res) => {
  const path = req.url;

  if (path === '/style.css') {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/css');
    res.write(fs.readFileSync('./style.css', { encoding: 'utf8' }));
    res.end();
  } else {
    const data = await getDepartures();
    const morningTrain = data.departures.all.find(train => train.train_uid === amTrainId);

    if (typeof morningTrain === 'undefined') {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/html');
      res.end(Error());
    } else {
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
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
