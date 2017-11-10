import React from 'react'

import Checkout from './Checkout'

class Cart extends React.Component {
  state = {
    shoppingCart: [],
    name: "",
    telephone: "",
    description: "",
    subtotal: 0.00,
    tax: 0.00,
    total: 0.00
  }

  calculateSubtotal(items) {
    var subtotal = 0
    for(var index in items) {
      subtotal += Number(items[index].quantity) * Number(items[index].item.price)
    }
    return subtotal.toFixed(2)
  }

  calculateTax(subtotal) {
    return (Number(subtotal) * 0.0875).toFixed(2)
  }

  calculateTotal(subtotal, tax) {
    return (Number(subtotal) + Number(tax)).toFixed(2)
  }

  formatDescription(items) {
    var description = ""
    for (var index in items) {
      description += `${items[index].item.name} (QTY: ${items[index].quantity}) --- `
    }
    return description
  }

  componentDidMount() {
    var itemsArray = JSON.parse(localStorage.getItem('itemsArray')) || []

    var subtotal = this.calculateSubtotal(itemsArray)
    var tax = this.calculateTax(subtotal)
    var total = this.calculateTotal(subtotal, tax)
    var description = this.formatDescription(itemsArray)

    this.setState({
      shoppingCart: itemsArray,
      subtotal: subtotal,
      tax: tax,
      total: total,
      description: description
    })
  }
  
  removeCartItem(id) {
    //remove item from local storage
    var itemsArray = JSON.parse(localStorage.getItem('itemsArray')) || []
    for(var index in itemsArray) {
      if(itemsArray[index].item._id === id) { // if the item matches the id that we want to remove
        //remove item from array
        itemsArray.splice(index, 1)
      }
    }
    // save to local storage
    localStorage.setItem('itemsArray', JSON.stringify(itemsArray))

    var subtotal = this.calculateSubtotal(itemsArray)
    var tax = this.calculateTax(subtotal)
    var total = this.calculateTotal(subtotal, tax)
    var description = this.formatDescription(itemsArray)

    //remove item from state
    this.setState({
      shoppingCart: itemsArray,
      subtotal: subtotal,
      tax: tax,
      total: total,
      description: description
    })
  }

  clearCart() {
    localStorage.setItem('itemsArray', null)

    this.setState({
      shoppingCart: [],
      subtotal: 0,
      tax: 0,
      total: 0,
      description: ""
    })
  }

  onQuantityChange(evt, id) {
    // prevent user from inputting quantity less than 1
    if(evt.target.value <= 0) return (evt.target.value = 1)

    //set value of cart in localStorage
    var itemsArray = JSON.parse(localStorage.getItem('itemsArray')) || []
    for (var index in itemsArray) {
      if (itemsArray[index].item._id === id) { // if the item matches the id that we want to remove
        //change quantity of that item
        itemsArray[index].quantity = evt.target.value
      }
    }

    // save to local storage
    localStorage.setItem('itemsArray', JSON.stringify(itemsArray))

    var subtotal = this.calculateSubtotal(itemsArray)
    var tax = this.calculateTax(subtotal)
    var total = this.calculateTotal(subtotal, tax)
    var description = this.formatDescription(itemsArray)

    //remove item from state
    this.setState({
      shoppingCart: itemsArray,
      subtotal: subtotal,
      tax: tax,
      total: total,
      description: description
    })
  }

  onFieldChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    })
  }
  
  render() {
    return (
      <div className="Cart">
        <h1>Cart</h1>
        {this.state.shoppingCart.length == 0
        ? (<div>No items in the cart...</div>)
        : (
            <div className="products">
              <button onClick={this.clearCart.bind(this)}>Clear Cart</button>
              {this.state.shoppingCart.map(cartItem => {
                return (
                  <div key={cartItem.item._id} style={{marginBottom: "30px"}}>
                    <img src={cartItem.item.image} width="300" /> <br/>
                    {cartItem.item.name} - ${cartItem.item.price}<br/>
                    Quantity: <input onChange={(evt) => {this.onQuantityChange(evt, cartItem.item._id)}} type="number" defaultValue={cartItem.quantity} ref={cartItem.item._id + '-quantity'} /> <br/>
                    <button onClick={() => {this.removeCartItem(cartItem.item._id)}}>Remove From Cart</button>
                  </div>
                )
              })}
              <hr/>
              <div>
                <p>Subtotal: ${this.state.subtotal}</p>
                <p>Tax: ${this.state.tax}</p>
                <p><b>Total: ${this.state.total}</b></p>
              </div>
              <hr/>
              <input onChange={(evt) => {this.onFieldChange(evt)}} type="text" name="name" placeholder="Name" /> <br/>
              <input onChange={(evt) => {this.onFieldChange(evt)}} type="tel" name="telephone" placeholder="Telephone"/> <br/>
              {!this.state.name || !this.state.telephone
              ? <span>Please fill in your name and telephone number to complete this order</span>
              : <Checkout
                  shoppingCart={this.state.shoppingCart}
                  amount={this.state.total}
                  description={this.state.description}
                  customerName={this.state.name}
                  telephone={this.state.telephone}
                  clearCart={this.clearCart.bind(this)}
                  history={this.props.history} />
              }
            </div>
          )
        }
      </div>
    )
  }
}

export default Cart