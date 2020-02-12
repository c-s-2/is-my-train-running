const Head = require('./head');
const Footer = require('./footer');

const Error = () => {
  return `
    <!DOCTYPE html>
    <html lang="en-GB">
      ${Head({ title: 'Error' })}
      <body>
        <main>
          <h1>Train not found</h1>
        </main>
        ${Footer()}
      </body>
    </html>
  `;
};

module.exports = Error;
