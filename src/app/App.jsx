const React = require('react');
const{ AppContainer } = require('react-hot-loader');

const TestCon = require('./components/TestCom');
const { Window, TitleBar, Text } = require('react-desktop/macOs');


class App extends React.Component {

    render() {
    return <AppContainer>
            <Window
                chrome
                height="500px"
                padding="5px"
            >
                <TitleBar title="untitled text 5" controls/>
                <Text>Hello World</Text>
            </Window>
        </AppContainer>;
    }
}

module.exports = App;
