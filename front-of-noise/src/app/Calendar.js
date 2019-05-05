import React from 'react';
import BulmaCalendar from 'bulma-extensions/bulma-calendar';

const Calendar = () => (
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
      <BulmaCalendar />
    </div>
  </section>
);

export default Calendar;
