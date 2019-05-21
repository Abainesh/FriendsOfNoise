import React, {Component} from 'react';

import 'bulma-extensions/bulma-pricingtable/dist/css/bulma-pricingtable.min.css';

class PricingTable extends Component {

render() {
  return (
    <div class="pricing-table is-horizontal">
  <div class="pricing-plan">
    <div class="plan-header">Don't be a stranger!</div>
    <div class="plan-items">
      <div class="plan-item">Just you</div>
      <div class="plan-item">being there</div>
      <div class="plan-item">is a bonus</div>
      <div class="plan-item">-</div>
    </div>
    <div class="plan-footer">
      <div class="plan-price"><span class="plan-price-amount">
      <span class="plan-price-currency">$</span>0</span>/month</div>
      <button class="button is-fullwidth" disabled="disabled">Current plan</button>
    </div>
  </div>

  <div class="pricing-plan is-info">
    <div class="plan-header">Friend</div>
    <div class="plan-items">
      <div class="plan-item">You!</div>
      <div class="plan-item">Unlimited shows a month</div>
      <div class="plan-item">Early tickets</div>
      <div class="plan-item">Reservations</div>
    </div>
    <div class="plan-footer">
      <div class="plan-price"><span class="plan-price-amount"><span class="plan-price-currency">$</span>10</span>/month</div>
      <button class="button is-fullwidth">Choose</button>
    </div>
  </div>

  <div class="pricing-plan is-danger">
    <div class="plan-header">Good Friend</div>
    <div class="plan-items">
      <div class="plan-item">You!</div>
      <div class="plan-item">+2 Lucky others</div>
      <div class="plan-item">-</div>
      <div class="plan-item">-</div>
    </div>
    <div class="plan-footer">
      <div class="plan-price"><span class="plan-price-amount"><span class="plan-price-currency">$</span>30</span>/month</div>
      <button class="button is-fullwidth">Choose</button>
    </div>
  </div>

  <div class="pricing-plan is-warning">
    <div class="plan-header">Best Friend</div>
    <div class="plan-items">
      <div class="plan-item">You!</div>
      <div class="plan-item">+5 Lucky others</div>
      <div class="plan-item">Your membership <strong>free!</strong></div>
      <div class="plan-item">-</div>
    </div>
    <div class="plan-footer">
      <div class="plan-price"><span class="plan-price-amount"><span class="plan-price-currency">$</span>50</span>/month</div>
      <button class="button is-fullwidth">Choose</button>
    </div>
  </div>
</div>
);
  }
}


export default PricingTable;
