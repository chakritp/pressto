import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import './styles.css'

import Navbar from './Navbar'
import Home from './views/Home'
import Menu from './views/Menu'
import Cart from './views/Cart'

class App extends Component {
  state = {
    shoppingCart: [] // { product, qty }
  }
  
  // componentDidMount() {
  //   this.setState({
      
  //   })
  // }
  
  updateCart(item, quantity=1) {
    // first solution
    // if the item already exists in local storage, add the inputted quantity to the existing quantity
    // var newQuantity = localStorage.getItem(item.name) ? Number(localStorage.getItem(item.name)) + Number(quantity) : quantity
    // localStorage.setItem(item.name, newQuantity)

    
    var items = JSON.parse(localStorage.getItem('items'))
    // console.log(items)
    
    if(!items){ // items hasn't been initialized yet
      var items = {}
      items[item.name] = { item, quantity }
    }
    else { // append the quantity of the product in the existing local storage
      for(var key in items) {
        if(items[key].item.name === key){
          var newQuantity = Number(items[key].quantity) + Number(quantity)
          items[key].quantity = newQuantity
        }
      }
    }
    localStorage.setItem('items', JSON.stringify(items))


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
        </Switch>
      </div>
    );
  }
}

export default App;
