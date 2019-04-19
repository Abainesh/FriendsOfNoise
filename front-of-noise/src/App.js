import React, { Component } from 'react';
import {Helmet} from 'react-helmet';
import './App.css';

class App extends Component {
  render() {
    return (
        <section className="section">
          <div className="container">
            <h1 className="title">Friends of Noise</h1>
            <nav className="navbar">
              <ButtonToolbar>
                <Button variant="primary">Log in</Button>
                <Button variant="primary">Sign up</Button>
              </ButtonToolbar>;
            </nav>
            <p className="subtitle">
              All ages <strong>always</strong>!
            </p>
            <p className="membertagline">
              Ask about how to be sponsored for a membership.
            </p>
          </div>
        </section>
    );
  }
}

export default App;
