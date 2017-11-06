import React, { Component } from 'react';

import Navbar from './Navbar'
import Menu from './views/Menu'

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Pressto</h1>
        {<Navbar />}
        <Menu />
      </div>
    );
  }
}

export default App;
