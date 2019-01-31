import React, { Component } from 'react';
import Owner from './Owner';
import Room from './Room';
import Kitchen from './Kitchen';
import Customer from './Customer';

class App extends Component {
  render() {
    return (
      <>
        <Owner />
        <Room />
        <Kitchen />
        <Customer />
      </>
    );
  }
}

export default App;
