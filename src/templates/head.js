const Footer = ({ title }) => {
  return `
  <html lang="en-GB">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta name="description" content="Check if my train is running">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      <meta name="theme-color" content="#172648"/>
      <title>${title}</title>
      <link rel="stylesheet" type="text/css" href="./style.css">
      <link rel="manifest" href="./manifest.json">
      <link rel="apple-touch-icon" href="/assets/train-57.png"/>
      <script src="./service_worker.js" type="text/javascript"></script>
    </head>
  `;
};

module.exports = Footer;
