import React from 'react';

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
                {this.props.children}
            </div>
        );
    }
}

export default Main;