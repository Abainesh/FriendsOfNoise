/* Import Components */
import React, {Component} from 'react';
import Tile from 'react-bulma-components/lib/components/tile';
import Heading from 'react-bulma-components/lib/components/heading';
import Section from 'react-bulma-components/lib/components/section';
import {Link} from 'react-router-dom';
import axios from 'axios';
	


class Us extends Component{
  
    
    state = {

    authenticated: false
  }
     render() {
      return(
      <Section>
        <Tile kind="parent">
          <Tile renderAs="article" kind="child" size="7" notification color="warning">

          <Section>
          <div className="has-text-centered">
          Friends of Noise is a non-profit, educational, all-ages organization. Our mission is to provide  safer and productive spaces for all-ages concerts, focused arts education, and leadership opportunities for youth with a focus on providing marginalized youth and youth of color access to performative creative expression. Our long-term goals are to contribute to the development of a region wide network of young people and adults that are learned and ready to pursue a career in the music industry on stage or backstage and to grow into a youth centered arts center that resides in a music focused arts hub in an underserved community within our city.
          </div>
          </Section>
          </Tile>
          </Tile>
        </Section>
      )
    }
    
  }
  
export default Us;
