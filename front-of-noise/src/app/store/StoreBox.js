import React, { Component } from 'react';

import Shelf from './Shelf';
import FloatCart from './FloatCart';

class StoreBox extends Component {
  render() {
    return (
      <div className="StoreBox">
        <main>
          <Shelf />
        </main>
        <FloatCart />
      </div>
    );
  }
}

export default StoreBox;
