import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import './styles.css'

import Navbar from './Navbar'
import Home from './views/Home'
import Menu from './views/Menu'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/menu" component={Menu} />
        </Switch>
      </div>
    );
  }
}

export default App;
