const dotenv = require('dotenv').config();
const fetch = require('node-fetch');
const fs = require('fs');

const Error = require('./templates/error.js');
const Page = require('./templates/page.js');

const amTrainId = 'C72916';
const publicPath = './public'

const getDepartures = () => {
  return fetch(`http://transportapi.com/v3/uk/train/station/tiploc:STKP/live.json?app_id=${process.env.APP_ID}&app_key=${process.env.APP_KEY}`)
  .then(response => response.json())
  .then(response => response);
};

const generateIndex = async () => {
  const index = fs.createWriteStream(`${publicPath}/index.html`);
  const data = await getDepartures();
  const morningTrain = data.departures.all.find(train => train.train_uid === amTrainId);
  let html;

  if (typeof morningTrain === 'undefined') {
    console.log(`no train found for ${amTrainId}`);
    html = Error();
  } else {
    console.log(`train found for ${amTrainId}`);
    const {
      aimed_departure_time: aimedDepartureTime,
      destination_name: destination,
      expected_departure_time: expectedDepartureTime,
      operator_name: operator,
      platform,
      status,
    } = morningTrain;
    const styleModifier = status.toLowerCase().replace(' ', '_');

    switch(status) {
      case 'CANCELLED':
        html = Page({
          content: `
            <h1>
              The ${aimedDepartureTime} ${operator} service to
              ${destination} is...
            </h1>
            <h2>CANCELLED</h2>
          `,
          status,
          styleModifier,
        });
        break;
      default:
        html = Page({
          content: `
            <h1>
              The ${aimedDepartureTime} ${operator} service to
              ${destination} is...
            </h1>
            <h2>${status}</h2>
            <p>Expected departure time: ${expectedDepartureTime}</p>
            <p>Platform: ${platform}</p>
          `,
          status,
          styleModifier,
        });
        break;
    }
  }

  console.log('index.html generated');
  index.write(html);
};

const generateStylesheet = () => {
  fs.copyFile('src/style.css', `${publicPath}/style.css`, (err) => {
    if (err) throw err;
    console.log('style.css generated');
  });
};

generateIndex();
generateStylesheet();
