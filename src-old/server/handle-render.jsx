const { renderToString } = require('react-dom/server');
const App = require('../app/App');

function handleRender(req, res) {

    const html = renderToString( < App /> );


    res.send(`    
    <!doctype html>
    <html>
      <head>
        <title>Redux Universal Example</title>
      </head>
      <body>
        <div id="root">${html}</div>
        <script src="/static/app.bundle.js"></script>
      </body>
    </html>
    `);
}

module.exports = handleRender;