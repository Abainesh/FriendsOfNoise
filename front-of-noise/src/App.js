import React, { Component } from 'react';
// import {Helmet} from 'react-helmet';
import './App.css';
import FormContainer from './containers/FormContainer';

class App extends Component {
  render() {
    return (
        <section className="section">
          <div className="container">
            <h1 className="title">Friends of Noise</h1>
            <nav className="navbar">

            </nav>
            <p className="subtitle">
              All ages <strong>always</strong>!
            </p>
            <p className="membertagline">
              Ask about how to be sponsored for a membership.
            </p>
          </div>
          <div className="col-md-6">
            <br />
            <FormContainer />
          </div>
        </section>
    );
  }
}


export default App;
