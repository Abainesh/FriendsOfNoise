import React from "react";

import BigCalendar from 'react-big-calendar';
import moment from 'moment';

// Setup the localizer by providing the moment (or globalize) Object
// to the correct localizer.
const localizer = BigCalendar.momentLocalizer(moment) // or globalizeLocalizer

const MyCalendar = props => (
  <div>
    <BigCalendar
      localizer={localizer}
      events={events}
      startAccessor="start"
      endAccessor="end"
    />
  </div>
)

const events = [
    {
        start: '2015-07-20',
        end: '2015-07-02',
        eventClasses: 'optionalEvent',
        title: 'test event',
        description: 'This is a test description of an event',
    },
    {
        start: '2015-07-19',
        end: '2015-07-25',
        title: 'test event',
        description: 'This is a test description of an event',
        data: 'you can add what ever random data you may want to use later',
    }
];

// let Basic = ({ localizer }) => (
//   <BigCalendar
//     events={events}
//     views={allViews}
//     step={60}
//     showMultiDayTimes
//     max={dates.add(dates.endOf(new Date(2015, 17, 1), 'day'), -1, 'hours')}
//     defaultDate={new Date(2015, 3, 1)}
//     localizer={localizer}
//   />
// )


class Cal extends React.Component {
  state = {
    currentMonth: new Date(),
    selectedDate: new Date()
  };


  render() {
    return (
      <div>
        <MyCalendar
        />
      </div>
    );
  }

}

export default Cal;
