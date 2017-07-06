const React = require('react');
const{ AppContainer } = require('react-hot-loader');

const TestCon = require('./components/TestCom');


class App extends React.Component {

    render() {
    return <AppContainer>
            <div>
                <label>Testing..</label>
                <input type="text" />
                <input type="submit" />
                  <TestCon></TestCon>
            </div>
        </AppContainer>;
    }
}

module.exports = App;
