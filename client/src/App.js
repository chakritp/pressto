import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import './styles.css'
import clientAuth from './clientAuth.js'

import Navbar from './Navbar'
import Home from './views/Home'
import Menu from './views/Menu'
import Cart from './views/Cart'
import Order from './views/Order'
import CurrentOrder from './views/CurrentOrder'
import OrderConfirmation from './views/OrderConfirmation'
import ProductIndex from './views/ProductIndex'
import ProductEdit from './views/ProductEdit'
import LogIn from './views/LogIn'
import LogOut from './views/LogOut'

class App extends Component {
  state = {
    shoppingCart: [], // { product, qty }
    currentUser: null
  }
  
  componentDidMount() {
    var itemsArray = JSON.parse(localStorage.getItem('itemsArray')) || []
    
    this.setState({
      currentUser: clientAuth.getCurrentUser(),
      shoppingCart: itemsArray 
    })
  }

  onLoginSuccess(user) {
    this.setState({ currentUser: clientAuth.getCurrentUser()})
  }

  logout() {
    clientAuth.logOut()
    this.setState({currentUser: null})
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
          <Route path="/order-confirmation/:id" component={OrderConfirmation} />
          <Route path="/current-orders" component={CurrentOrder} />
          <Route path="/products" component={ProductIndex} />
          <Route path="/products/:id/edit" component={ProductEdit} />
          <Route path="/login" component={LogIn} />
          <Route path="/logout" component={LogOut} />
        </Switch>
      </div>
    );
  }
}

export default App;
