import React from 'react'

import Checkout from './Checkout'

class Cart extends React.Component {
  state = {
    shoppingCart: [],
    subtotal: 0.00,
    tax: 0.00,
    total: 0.00
  }

  calculateSubtotal(items) {
    var subtotal = 0
    console.log(items)
    for(var index in items) {
      subtotal += Number(items[index].quantity) * Number(items[index].item.price)
    }
    console.log(subtotal)
    return subtotal.toFixed(2)
  }

  calculateTax(subtotal) {
    return (Number(subtotal) * 0.0875).toFixed(2)
  }

  calculateTotal(subtotal, tax) {
    return (Number(subtotal) + Number(tax)).toFixed(2)
  }

  componentDidMount() {
    var itemsArray = JSON.parse(localStorage.getItem('itemsArray')) || []

    var subtotal = this.calculateSubtotal(itemsArray)
    var tax = this.calculateTax(subtotal)
    var total = this.calculateTotal(subtotal, tax)

    this.setState({
      shoppingCart: itemsArray,
      subtotal: subtotal,
      tax: tax,
      total: total
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

    //remove item from state
    this.setState({
      shoppingCart: itemsArray,
      subtotal: subtotal,
      tax: tax,
      total: total
    })
  }

  clearCart() {
    localStorage.setItem('itemsArray', null)

    this.setState({
      shoppingCart: [],
      subtotal: 0,
      tax: 0,
      total: 0
    })
  }

  onQuantityChange(evt, id) {
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

    //remove item from state
    this.setState({
      shoppingCart: itemsArray,
      subtotal: subtotal,
      tax: tax,
      total: total
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
              {/* <button>Order</button> */}
              <hr/>
              <div>
                <p>Subtotal: ${this.state.subtotal}</p>
                <p>Tax: ${this.state.tax}</p>
                <p><b>Total: ${this.state.total}</b></p>
              </div>
              <hr/>
              Name
              <input type="text"/> <br/>

              <Checkout amount={this.state.total} />
            </div>
          )
        }
      </div>
    )
  }
}

export default Cart