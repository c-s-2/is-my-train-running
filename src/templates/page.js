const Head = require('./head');
const Footer = require('./footer');

const Page = ({ content, status, styleModifier }) => {
  return `
    <!DOCTYPE html>
    <html lang="en-GB">
      ${Head({ title: status })}
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
