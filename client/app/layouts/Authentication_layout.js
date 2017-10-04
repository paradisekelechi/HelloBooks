import React from 'react';
import ReactDOM from 'react-dom';
import {Header} from '../components/Header';
import {Navigation} from '../components/Navigation';
import {Footer} from '../components/Footer';

export default class  Authentication_Layout extends React.Component {
    render(){
        return(
            <div>
                {this.props.children}
            </div>
        );
    }
}