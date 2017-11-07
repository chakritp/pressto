import React from 'react'

class Cart extends React.Component {
  state = {
    shoppingCart: []
  }

  componentDidMount() {
    var itemsArray = JSON.parse(localStorage.getItem('itemsArray')) || []
    this.setState({
      shoppingCart: itemsArray
    })
  }
  
  render() {
    return (
      <div className="Cart">
        <h1>Cart</h1>
        {!this.state.shoppingCart
        ? (<div>No items in the cart...</div>)
        : (
            <div className="products">
              {this.state.shoppingCart.map(product => {
                return <div key={product.item._id}>{product.item.name}, Quantity: {product.quantity}</div>
              })}
            </div>
          )
        }
      </div>
    )
  }
}

export default Cart