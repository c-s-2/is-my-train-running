const Page = ({ content, status, styleModifier }) => {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>${status}</title>
        <link rel="stylesheet" type="text/css" href="./style.css">
      </head>

      <body>
        <main class="${styleModifier}">
          ${content}
          <small>
            source:
            <a
              href="http://transportapi.com/"
              rel="nofollow noreferrer"
            >
              http://transportapi.com/
            </a>
          </small>
        </main>
      </body>
    </html>
  `;
};

module.exports = Page;
