import React from 'react'
import StripeCheckout from 'react-stripe-checkout'
import axios from 'axios'

class Checkout extends React.Component {
  onToken(amount, description, token) {
    var data = {
      token,
      description,
      amount
    }
    axios({
      url: '/api/charge',
      method: 'POST',
      data: data
    }).then(res => {
      console.log(res)
    })
  }

  render() {
    return (
      <StripeCheckout
        token={this.onToken.bind(this, 10000, "test")}
        stripeKey={process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY}
        amount={10000}
        currency="USD"
        label="Checkout"
      />
    )
  }
}

export default Checkout