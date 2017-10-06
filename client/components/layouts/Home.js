import React from 'react';

/**
 * 
 * 
 * @class Home
 * @extends {React.Component}
 */
class Home extends React.Component{
    /**
     * 
     * 
     * @returns 
     * @memberof Home
     */
    render(){
        return(
            <div>
                {this.props.children}
            </div>
        );
    }
}

export default Home;