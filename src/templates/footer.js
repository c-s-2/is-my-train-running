const Footer = () => {
  return `
    <footer>
      <small>checked: ${new Date().toUTCString()}</small>
      <small>
        source:
        <a
          href="http://transportapi.com/"
          rel="nofollow noreferrer"
        >
          http://transportapi.com/
        </a>
      </small>
    </footer>
  `;
};

module.exports = Footer;
