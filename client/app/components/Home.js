import React from 'react';

export class Home extends React.Component {
    render(){
        return(
            <div>
                <h1>I am Home!</h1>
                <h2>My name is {this.props.name} and I am studying {this.props.course}</h2>
                {this.props.children}
            </div>
        );
    }
}

Home.propTypes = {
    name:React.PropTypes.string,
    course: React.PropTypes.string,
    children: React.PropTypes.element.isRequired
}