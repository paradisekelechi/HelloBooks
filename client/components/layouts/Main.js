import React from 'react';

//Import the common layout components
import Navigation from '../common/main/Navigation';

/**
 * 
 * 
 * @class Main
 * @extends {React.Component}
 */
class Main extends React.Component{
    /**
     * 
     * 
     * @returns 
     * @memberof Main
     */
    render(){
        return(
            <div>
                <Navigation />
                <a href="#" data-activates="slide-out" className="button-collapse account-slideout account-info"><i className="material-icons">menu</i></a>
                {this.props.children}
            </div>
        );
    }
}

export default Main;