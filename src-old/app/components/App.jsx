const React = require('react');

class App extends React.Component {

    render() {
    return <form>
                <label>Tested</label>
                <input type="text" />
                <input type="submit" />
            </form>;
    }
}

module.exports = App;