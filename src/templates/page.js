const Head = require('./head');
const Footer = require('./footer');

const Page = ({ content, status }) => {
  return `
    <!DOCTYPE html>
    <html lang="en-GB">
      ${Head({ title: status })}
      <body>
        <main>${content}</main>
        ${Footer()}
      </body>
    </html>
  `;
};

module.exports = Page;
