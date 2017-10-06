import React from 'react';

//Import the common layout components
import Header from '../common/home/Header';
import Navigation from '../common/home/Navigation';
import Footer from '../common/home/Footer';

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
                <Header />
                <Navigation />
                {this.props.children}
                <Footer />
            </div>
        );
    }
}

export default Home;