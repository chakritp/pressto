import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import './styles.css'
import clientAuth from './clientAuth.js'
import 'bulma/css/bulma.css'
import AlertContainer from 'react-alert'

import Navbar from './Navbar'
import Footer from './Footer'
import Home from './views/Home'
import Menu from './views/Menu'
import Cart from './views/Cart'
import Order from './views/Order'
import CurrentOrder from './views/CurrentOrder'
import OrderConfirmation from './views/OrderConfirmation'
import ProductIndex from './views/ProductIndex'
import ProductNew from './views/ProductNew'
import ProductEdit from './views/ProductEdit'
import LogIn from './views/LogIn'
import LogOut from './views/LogOut'

class App extends Component {
  alertOptions = {
    offset: 14,
    position: 'top left',
    theme: 'dark',
    time: 5000,
    transition: 'scale'
  }
  
  showSuccess(text) {
    this.msg.show(text, {
      time: 2000,
      type: 'success'
    })
  }

  showError(text) {
    this.msg.show(text, {
      time: 2000,
      type: 'error'
    })
  }

  state = {
    shoppingCart: [], // { product, qty }
    currentUser: null
  }

  componentWillMount() {
    this.setState({
      currentUser: clientAuth.getCurrentUser()
    })
  }

  componentDidMount() {
    var itemsArray = JSON.parse(localStorage.getItem('itemsArray')) || []
    
    this.setState({
      shoppingCart: itemsArray 
    })
  }

  onLoginSuccess(user) {
    this.setState({ currentUser: clientAuth.getCurrentUser()})
  }

  logout() {
    clientAuth.logOut()
    this.showSuccess("Successfully logged out")
    this.setState({currentUser: null})
  }
  
  updateCart(item, quantity=1) {
    if(quantity > 0) {
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

      this.showSuccess(`Added ${quantity} ${item.name} to cart`)
      
      localStorage.setItem('itemsArray', JSON.stringify(itemsArray))

      this.setState({
        shoppingCart: [
          ...this.state.shoppingCart, 
          { item, quantity }
        ]
      })
    } else {
      this.showError('Quantity must be at least 1')
      return false
    }

  }

  render() {
    const { currentUser } = this.state
    return (
      <div className="App content container">
        <Navbar currentUser={currentUser} />
        <div className="buffer-space"></div>
        <AlertContainer ref={a => this.msg = a} {...this.alertOptions} />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/menu" render={(props) => {
            return <Menu {...props} onUpdateCart={this.updateCart.bind(this)}/>
          }} />
          <Route path="/cart" render={(props) => {
            return <Cart {...props} showSuccess={this.showSuccess.bind(this)} showError={this.showError.bind(this)}/>
          }} />
          <Route path="/order-confirmation/:id" component={OrderConfirmation} />
          <Route path="/current-orders" render={(props) => {
            return <CurrentOrder {...props} currentUser={currentUser} />
          }} />
          <Route path="/login" render={(props) => {
            return !currentUser
            ? <LogIn {...props} showSuccess={this.showSuccess.bind(this)} showError={this.showError.bind(this)} onLoginSuccess={this.onLoginSuccess.bind(this)} />
            : <Redirect to="/order-history" />
          }} />


          {/* Admin Only Routes */}
          <Route path="/order-history" render={(props) => {
            return currentUser 
            ? <Order />
            : <Redirect to="/" />
          }} />

          <Route exact path="/products" render={(props) => {
            return currentUser
            ? <ProductIndex {...props} />
            : <Redirect to="/" />
          }} />

          <Route exact path="/products/new" render={(props) => {
            return currentUser
            ? <ProductNew {...props} />
            : <Redirect to="/" />
          }} />

          <Route path="/products/:id/edit" render={(props) => {
            return currentUser
              ? <ProductEdit {...props} />
              : <Redirect to="/" />
          }} />
          <Route path="/logout" render={(props) => {
            return <LogOut showSuccess={this.showSuccess.bind(this)} onLogOut={this.logout.bind(this)} />
          }} />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default App;
