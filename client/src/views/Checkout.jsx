import React from 'react'
import StripeCheckout from 'react-stripe-checkout'

class Checkout extends React.Component {
  onToken(token) {
    fetch('/api/save-stripe-token', {
      method: 'POST',
      body: JSON.stringify(token)
    }).then(res => {
      console.log(res)
      res.json().then(data => {
        alert('We are in business')
      })
    })
  }

  render() {
    return (
      <StripeCheckout
        token={this.onToken.bind(this)}
        stripeKey={process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY}
        label="Checkout"
      />
    )
  }
}

export default Checkout