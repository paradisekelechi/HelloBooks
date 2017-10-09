import React, {PropTypes} from 'react';

//Import the common layout components
import Footer from '../common/authentication/Footer';

/**
 * 
 * 
 * @class Authentication
 * @extends {React.Component}
 */
class Authentication extends React.Component{
    /**
     * 
     * 
     * @returns 
     * @memberof Authentication
     */
    render(){
        return(
            <div>
                {this.props.children}
                <Footer />
            </div>
        );
    }
}

Authentication.propTypes =  {
    children: PropTypes.object.isRequired
}

export default Authentication;