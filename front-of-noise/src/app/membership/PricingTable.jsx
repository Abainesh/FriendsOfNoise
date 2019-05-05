import React, {Component} from 'react';

class PricingTable extends Component {

render() {
  return (
    <div class="pricing-table is-horizontal">
  <div class="pricing-plan">
    <div class="plan-header">Starter</div>
    <div class="plan-items">
      <div class="plan-item">Just you</div>
      <div class="plan-item">3 shows a month</div>
      <div class="plan-item">Discounts on merch</div>
      <div class="plan-item">Early tickets</div>
    </div>
    <div class="plan-footer">
      <div class="plan-price"><span class="plan-price-amount"><span class="plan-price-currency">$</span>10</span>/month</div>
      <button class="button is-fullwidth" disabled="disabled">Current plan</button>
    </div>
  </div>

  <div class="pricing-plan is-warning">
    <div class="plan-header">Good Friend</div>
    <div class="plan-items">
      <div class="plan-item">You!</div>
      <div class="plan-item">2 lucky others</div>
      <div class="plan-item">-</div>
      <div class="plan-item">-</div>
    </div>
    <div class="plan-footer">
      <div class="plan-price"><span class="plan-price-amount"><span class="plan-price-currency">$</span>30</span>/month</div>
      <button class="button is-fullwidth">Choose</button>
    </div>
  </div>

  <div class="pricing-plan is-active">
    <div class="plan-header">Greater Friend</div>
    <div class="plan-items">
      <div class="plan-item">You!</div>
      <div class="plan-item">5 Lucky others</div>
      <div class="plan-item">-</div>
      <div class="plan-item">-</div>
    </div>
    <div class="plan-footer">
      <div class="plan-price"><span class="plan-price-amount"><span class="plan-price-currency">$</span>60</span>/month</div>
      <button class="button is-fullwidth">Choose</button>
    </div>
  </div>

  <div class="pricing-plan is-danger">
    <div class="plan-header">Best Friend</div>
    <div class="plan-items">
      <div class="plan-item">You!</div>
      <div class="plan-item">10 Lucky others</div>
      <div class="plan-item">Your membership free!</div>
      <div class="plan-item">-</div>
    </div>
    <div class="plan-footer">
      <div class="plan-price"><span class="plan-price-amount"><span class="plan-price-currency">$</span>100</span>/month</div>
      <button class="button is-fullwidth">Choose</button>
    </div>
  </div>
</div>
);
  }
}


export default PricingTable;
