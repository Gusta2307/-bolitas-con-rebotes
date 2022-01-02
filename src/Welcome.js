import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import App from './App';

export default class Welcome extends Component{
    constructor(){
        super();
        this.title = "Welcome, click me!"
    }

    go = () => {
        ReactDOM.render((<App />), document.getElementById('root'));
    }

    render() {
        return (
            <>
            <div onClick={this.go} id="welcome">
                <h1>{this.title}</h1>
            </div> 
            </>
        )
    }
}
