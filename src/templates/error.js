const Head = require('./head');
const Footer = require('./footer');

const Error = () => {
  return `
    <!DOCTYPE html>
    <html lang="en-GB">
      ${Head({ title: 'Error' })}
      <body>
        <main>
          <h1>
            Train not found
          </h1>
          ${Footer()}
        </main>
      </body>
    </html>
  `;
};

module.exports = Error;
