import React from 'react'
import StripeCheckout from 'react-stripe-checkout'
import axios from 'axios'

class Checkout extends React.Component {
  onToken(token) {
    var data = {
      token,
      description: "Name: " + this.props.customerName + ", Telephone: " + this.props.telephone + " --- " + this.props.description,
      amount: this.props.amount * 100 //value in cents
    }

    axios({
      url: '/api/charge',
      method: 'POST',
      data: data
    }).then(res => {
      console.log(res)
      var shoppingCart = this.props.shoppingCart
      var orderData = {
        stripeId: res.data.charge.id,
        customer: {
          name: this.props.customerName,
          telephone: this.props.telephone
        },
        items: this.props.shoppingCart.map((cartItem) => { return { product: cartItem.item._id, quantity: cartItem.quantity } }), //map item quantity and id here
      }
      
      // create order from shopping cart
      axios({
        url: '/api/orders',
        method: 'POST',
        data: orderData
      }).then(res => {
        // order saved to mongo
        console.log(res)

        //clear shopping cart from local storage
        this.props.clearCart()
        
        //redirect to menu page
        this.props.history.push('/order-confirmation/' + res.data.order._id)
      })
    })
  }

  render() {
    return (
      <StripeCheckout
        name="Pressto Checkout"
        token={this.onToken.bind(this)}
        stripeKey={process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY}
        amount={Number(this.props.amount) * 100}
        currency="USD"
        label="Checkout"
        email="orders@pressto.com"
      />
    )
  }
}

export default Checkout