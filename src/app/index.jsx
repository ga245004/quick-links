const React = require('react');
const ReactDOM = require('react-dom');

const RootContainer = require('./App');

const render = Component => {
  ReactDOM.render(
    <Component />,
    document.getElementById('root')
  );
}

render(RootContainer);

if (module.hot) {
    // module.hot.accept('./App', (NextApp) => {     
    //   //const NextApp = require('./App');
    //   render(NextApp);
    // });
    module.hot.accept();
}
