import React from "react";
import dateFns from "date-fns";
// import { render } from 'react-dom';
import BigCalendar from 'react-big-calendar';
import * as moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import '../../styles/css/calendar.css'
import Tile from 'react-bulma-components/lib/components/tile';
import Section from 'react-bulma-components/lib/components/section';
import Columns from 'react-bulma-components/lib/components/columns';

moment.locale('en-US');
const localizer = BigCalendar.momentLocalizer(moment);
let formats = {
  dayRangeHeaderFormat: ({ start, end }, culture, localizer) =>
    localizer.format(start, { date: 'short' }, culture) + ' — ' +
    localizer.format(end, { date: 'short' }, culture)
}

class Cal extends React.Component {
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

      <Columns.Column>
      <Section position="left">
      <Tile kind="parent">
        <Tile renderAs="article" kind="child" notification color="warning">
        <div className="calendar" style={{ height: 600, color: '#17a2b8' }}>

          <BigCalendar
            formats={formats}
            localizer={localizer}
            drilldownView='agenda'
            popup='true'
            // events={this.state.calendarEvents}
            events={[
              {
                'title': 'Celia Cruz on Ice!!!',
                'allDay': false,
                'start': new Date(2019, 5, 0, 10, 0), // 10.00 AM
                'end': new Date(2019, 5, 0, 14, 0), // 2.00 PM
              }
            ]}
            step={60}
            view='month'
            views={['month']}
            min={new Date(2018, 0, 1, 8, 0)} // 8.00 AM
            max={new Date(2021, 0, 1, 17, 0)} // Max will be 6.00 PM!
            date={new Date()}
            eventPropGetter={event => ({
              style: {
                background: '#17a2b8'
              }
            })}
          />


          </div>
        </Tile>
      </Tile>
      </Section>
      </Columns.Column>
    );
  }
}

export default Cal;
