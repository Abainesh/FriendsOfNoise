import React from 'react';

import Cal from './calendar/cal';
import Clist from './calendar/clist';
import Columns from 'react-bulma-components/lib/components/columns';

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
    <div>
      <br />
      <Columns>

        <Clist />
        <Cal />

      </Columns>
    </div>
    </div>
  </section>
);

export default Calendar;
