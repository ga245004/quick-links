const React = require('react');
const ReactDOM = require('react-dom');

class App extends React.Component {

    render() {
    return <form>
                <label>Testing</label>
                <input type="text" />
                <input type="submit" />
            </form>;
    }
}




ReactDOM.render( < App /> , document.getElementById('root'));