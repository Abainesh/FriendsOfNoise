import React from 'react';

import Cal from './calendar/cal';

const Calendar = () => (
  <section className="section">
    <div className="container">
      <h1 className="title">Friends of Noise</h1>
      <p className="subtitle">
        All ages <strong>always</strong>!
      </p>
      <p className="membertagline">
        Ask about how to be sponsored for a membership.
      </p>
    <div className="col-md-6">
      <br />
      <Cal />
    </div>
    </div>
  </section>
);

export default Calendar;
