import React from 'react';
import {render} from 'react-dom';

class App extends React.Component{
    render(){
        return (
            <div >
                <span >HelloBooks</span>
            </div>
        );
    }
}

class Logo extends React.Component {

    componentWillMount(){
        console.log('Logo mounting');
    }

    render(){
        return(
            <div className="col m12" >
                <span className="brand-logo" >HelloBooks</span>
            </div>
        );
    }
}

render (<Logo />, window.document.getElementById('login-logo'));