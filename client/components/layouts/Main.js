import React from 'react';

//Import the common layout components
import Header from '../common/main/Header';
import Navigation from '../common/main/Navigation';
import Footer from '../common/main/Footer';

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
                <Header />
                <Navigation />
                {this.props.children}
                <Footer />
            </div>
        );
    }
}

export default Main;