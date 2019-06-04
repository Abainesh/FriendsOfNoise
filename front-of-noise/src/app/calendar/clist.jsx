import React from "react";
import dateFns from "date-fns";
// import { render } from 'react-dom';
import * as moment from 'moment';
import '../../styles/css/calendar.css'
import Tile from 'react-bulma-components/lib/components/tile';
import Section from 'react-bulma-components/lib/components/section';
import Card from 'react-bulma-components/lib/components/card';
import Media from 'react-bulma-components/lib/components/media';
import Image from 'react-bulma-components/lib/components/image';
import Content from 'react-bulma-components/lib/components/content';
import Heading from 'react-bulma-components/lib/components/heading';
import Columns from 'react-bulma-components/lib/components/columns';

moment.locale('en-US');
let formats = {
  dayRangeHeaderFormat: ({ start, end }, culture, localizer) =>
    localizer.format(start, { date: 'short' }, culture) + ' — ' +
    localizer.format(end, { date: 'short' }, culture)
}

class Clist extends React.Component {
  // constructor(props: any) {
  //       super(props);
  // }

  state = {
    currentMonth: new Date(),
    selectedDate: new Date()
  };

  onDateClick = day => {
    this.setState({
      selectedDate: day
    });
  };

  nextMonth = () => {
    this.setState({
      currentMonth: dateFns.addMonths(this.state.currentMonth, 1)
    });
  };

  prevMonth = () => {
    this.setState({
      currentMonth: dateFns.subMonths(this.state.currentMonth, 1)
    });
  };

  render() {
    return (
      <Columns.Column size="one-third">
      <Section position="right">
      <Tile kind="parent" notification color="success">
        <Tile renderAs="article" kind="child">
        <div style={{ a: '#144880', margin: '20px auto' }}>

        <Card>
          <Card.Header>
            <Card.Header.Title>Upcoming Events</Card.Header.Title>
          </Card.Header>
          <Card.Content>
            <Media>
              <Media.Item renderAs="figure" position="right">
                <Image renderAs="p" size={64} alt="64x64" src="../images/wheel-whitebg.png" />
              </Media.Item>
              <Media.Item>
                <Heading size={4}>John Jacob Jingleheimer Schmidtt LIVE!</Heading>
                <Heading subtitle size={6}>
                  @jjjsTHEBAND
                </Heading>
              </Media.Item>
            </Media>
            <Content>
              Tickets officially in pre-sale! <a style={{ color: '#144880' }}>@friendsofnoise</a>
              <a href="#1" style={{ color: '#144880' }}> #tonight</a> <a style={{ color: '#144880' }} href="#2">#ska</a> Save a seat?
              <br />
              <time dateTime="2020-1-1">8:32 PM - 1 Jun 2020</time>
            </Content>
          </Card.Content>
          <Card.Footer>
            <Card.Footer.Item  style={{ color: '#144880' }} renderAs="a" href="#Yes">
              Yes
            </Card.Footer.Item>
            <Card.Footer.Item  style={{ color: '#144880' }} renderAs="a" href="#No">
              No
            </Card.Footer.Item>
            <Card.Footer.Item style={{ color: '#144880' }} renderAs="a" href="#Maybe">
              Maybe
            </Card.Footer.Item>
          </Card.Footer>

          <br />

          <Card.Content>
            <Media>
              <Media.Item renderAs="figure" position="right">
                <Image renderAs="p" size={64} alt="64x64" src="../images/wheel-whitebg.png" />
              </Media.Item>
              <Media.Item>
                <Heading size={4}>Celia Cruz ON ICE!</Heading>
                <Heading subtitle size={6}>
                  @celia
                </Heading>
              </Media.Item>
            </Media>
            <Content>
              Tickets officially in pre-sale! <a style={{ color: '#144880' }}>@friendsofnoise</a>
              <a style={{ color: '#144880' }} href="#1"> #nextweek</a> <a style={{ color: '#144880' }} href="#2">#salsa</a> Save a seat?
              <br />
              <time dateTime="2020-1-1">11:09 PM - 1 Jan 2020</time>
            </Content>
          </Card.Content>
          <Card.Footer>
            <Card.Footer.Item style={{ color: '#144880' }} renderAs="a" href="#Yes">
              Yes
            </Card.Footer.Item>
            <Card.Footer.Item style={{ color: '#144880' }} renderAs="a" href="#No">
              No
            </Card.Footer.Item>
            <Card.Footer.Item style={{ color: '#144880' }} renderAs="a" href="#Maybe">
              Maybe
            </Card.Footer.Item>
          </Card.Footer>
          </Card>

          </div>
        </Tile>
      </Tile>
      </Section>
      </Columns.Column>
    );
  }
}

export default Clist;
