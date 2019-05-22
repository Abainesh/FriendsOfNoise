import React from 'react';
import Us from './about/Us';
import Tile from 'react-bulma-components/lib/components/tile';

const About = () => (
  <section className="section">
    <div className="container">
      <h1 className="title">Friends of Noise</h1>
      <p className="subtitle">
        All ages <strong>always</strong>!
      </p>
      <p className="membertagline">
        Ask about how to be sponsored for a membership.
      </p>
    </div>

    <div className="col-md-6">
      <br />

      <Us />
    </div>
  </section>
);

export default About;
