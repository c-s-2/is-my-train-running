const Footer = require('./footer');

const Page = ({ content, status, styleModifier }) => {
  return `
    <!DOCTYPE html>
    <html lang="en-GB">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="description" content="Check if my train is running">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>${status}</title>
        <link rel="stylesheet" type="text/css" href="./style.css">
      </head>

      <body>
        <main class="${styleModifier}">
          ${content}
          ${Footer()}
        </main>
      </body>
    </html>
  `;
};

module.exports = Page;
