import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import './styles.css'

import Navbar from './Navbar'
import Home from './views/Home'
import Menu from './views/Menu'
import Cart from './views/Cart'
import Order from './views/Order'

class App extends Component {
  state = {
    shoppingCart: [] // { product, qty }
  }
  
  componentDidMount() {
    var itemsArray = JSON.parse(localStorage.getItem('itemsArray')) || []
    
    this.setState({
      shoppingCart: itemsArray 
    })
  }
  
  updateCart(item, quantity=1) {
    var itemsArray = JSON.parse(localStorage.getItem('itemsArray'))
    
    if(!itemsArray){ // items hasn't been initialized yet
      var itemsArray = []
      itemsArray.push({item, quantity})
    }
    else { // in the case that the array isn't empty
      var itemExists = false
      for(var index in itemsArray) {
        let currentItem = itemsArray[index].item

        if(currentItem.name == item.name) { // if the item exists in local storage, increment the quantity of it
          itemsArray[index].quantity = Number(itemsArray[index].quantity) + Number(quantity)
          itemExists = true
        }
      }

      //if item doesn't exist add the item to the array
      if(!itemExists) itemsArray.push({item, quantity})
    }
    
    localStorage.setItem('itemsArray', JSON.stringify(itemsArray))

    this.setState({
      shoppingCart: [
        ...this.state.shoppingCart, 
        { item, quantity }
      ]
    })
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
          <Route path="/cart" component={Cart} />
          <Route path="/order-history" component={Order} />
        </Switch>
      </div>
    );
  }
}

export default App;
