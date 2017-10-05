import React, {PropTypes} from 'react';
import Header from './common/Header.js';

/**
 * 
 * 
 * @class App
 * @extends {React.Component}
 */
class App extends React.Component {
    /**
     * 
     * 
     * @returns 
     * @memberof App
     */
    render(){
        return(
            <div>
                {this.props.children}
            </div>
        );
    }
}

App.propTypes = {
    children: PropTypes.object.isRequired
};

export default App;