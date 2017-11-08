import React from 'react'
import StripeCheckout from 'react-stripe-checkout'
import axios from 'axios'

class Checkout extends React.Component {
  onToken(name, amount, description, token) {
    var data = {
      token,
      description: "Name: " + name + "-> " + description,
      amount: amount * 100 //value in cents
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
        name="Pressto Checkout"
        token={this.onToken.bind(this, this.props.customerName, this.props.amount, this.props.description)}
        stripeKey={process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY}
        amount={Number(this.props.amount) * 100}
        currency="USD"
        label="Checkout"
      />
    )
  }
}

export default Checkout