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
      
      // create order from shopping cart

      //clear shopping cart from local storage
      // localStorage.setItem('itemsArray', null)

      //redirect to menu page
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