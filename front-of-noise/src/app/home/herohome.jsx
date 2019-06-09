import React, {Component} from 'react';


import Hero from 'react-bulma-components/lib/components/hero';
import Heading from 'react-bulma-components/lib/components/heading';
import Section from 'react-bulma-components/lib/components/section';
import Container from 'react-bulma-components/lib/components/container';

class HeroHome extends Component {

render() {
  return (
        <Hero color="warning" size="fullheight" gradient>
          <Hero.Body>
            <Container>
              <Heading>
              <img
                src="../images/logo.png"
                alt="Friends of Noise : Home of Noise!"
              /></Heading>
              <Heading spaced subtitle size={1}>
                Members' Only Portal
              </Heading>
            </Container>
          </Hero.Body>
        </Hero>
);
  }
}


export default HeroHome;
