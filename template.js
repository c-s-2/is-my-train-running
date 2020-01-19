const Template = ({ content, title }) => {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>${title}</title>
        <link rel="stylesheet" type="text/css" href="./style.css">
      </head>

      <body>
        <main class="${content.status !== 'ON TIME' ? 'late': ''}">
          <h1>
            The ${content.aimedDepartureTime} ${content.operator} service to
            ${content.destination} is...
          </h1>

          <h2>${content.status}</h2>

          <p>Expected departure time: ${content.expectedDepartureTime}</p>

          <p>Platform: ${content.platform}</p>

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

module.exports = Template;
