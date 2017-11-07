import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import './styles.css'

import Navbar from './Navbar'
import Home from './views/Home'
import Menu from './views/Menu'

class App extends Component {
  state = {
    shoppingCart: [] // { product, qty }
  }
  
  // componentDidMount() {
  //   this.setState({
      
  //   })
  // }
  
  updateCart(item, quantity=1) {
    // if the item already exists in local storage, add the inputted quantity to the existing quantity
    var newQuantity = localStorage.getItem(item.name) ? Number(localStorage.getItem(item.name)) + Number(quantity) : quantity
    localStorage.setItem(item.name, newQuantity)
    console.log("Updated local storage")
    // this.setState({
    //   shoppingCart: [
    //     ...this.state.shoppingCart, 
    //     { item: item, quantity: quantity }
    //   ]
    // })
  }

  render() {
    return (
      <div className="App">
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/menu" render={(props) => {
            return <Menu {...props} onUpdateCart={this.updateCart.bind(this)}/>
          }} />
        </Switch>
      </div>
    );
  }
}

export default App;
