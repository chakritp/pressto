import React from 'react'

class Cart extends React.Component {
  state = {
    shoppingCart: []
  }

  componentDidMount() {
    // this.setState({
    //   shoppingCart: 
    // })
  }
  
  render() {
    return (
      <div className="Cart">
        <h1>Cart</h1>
        {this.state.shoppingCart.length === 0
        ? (<div>No items in the cart...</div>)
        : (
            <div className="products">
              {this.state.shoppingCart.map(product => {
                <div>{product.name}, Quantity: {product.quantity}</div>
              })}
            </div>
          )
        }
      </div>
    )
  }
}

export default Cart