import React from 'react';

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
            </div>
        );
    }
}

export default Authentication;