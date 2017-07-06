const React = require('react');
const{ AppContainer } = require('react-hot-loader');

class TestComp extends React.Component {

    constructor(){
        super();
        this.state = {
            count : 0
        };
        this.increament = this.increament.bind(this);
    }

    increament(e){
        this.setState(prevState => {
            count :  prevState.count++
        });
    }

    render() {
    return <AppContainer>
                <div>
                    <h2>Updating Counter {this.state.count}</h2>
                    <button onClick={(e) => this.increament(e)}>++</button>
                </div>
            </AppContainer>;
    }
}

module.exports = TestComp;