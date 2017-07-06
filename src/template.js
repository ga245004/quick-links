module.exports = ({ body, title }) => {
    return `
    <!DOCTYPE html>
    <html>
      <head>
        <title>${title}</title>
      </head>
      
      <body>
        <div id="root">${body}</div>
        <script src="dist/bundle.js"></script>
      </body>
    </html>
  `;
};