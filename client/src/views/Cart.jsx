import React from 'react'

class Cart extends React.Component {
  state = {
    shoppingCart: [],
    total: 0
  }

  componentDidMount() {
    var itemsArray = JSON.parse(localStorage.getItem('itemsArray')) || []
    this.setState({
      shoppingCart: itemsArray
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

    //remove item from state
    this.setState({
      shoppingCart: itemsArray
    })
  }

  clearCart() {
    localStorage.setItem('itemsArray', null)

    this.setState({
      shoppingCart: []
    })
  }

  onQuantityChange(evt, id) {
    console.log(evt.target.value, id)

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

    //remove item from state
    this.setState({
      shoppingCart: itemsArray
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
                    {cartItem.item.name} <br/>
                    Quantity: <input onChange={(evt) => {this.onQuantityChange(evt, cartItem.item._id)}} type="number" defaultValue={cartItem.quantity} ref={cartItem.item._id + '-quantity'} /> <br/>
                    <button onClick={() => {this.removeCartItem(cartItem.item._id)}}>Remove From Cart</button>
                  </div>
                )
              })}
              <button>Order</button>
            </div>
          )
        }
      </div>
    )
  }
}

export default Cart