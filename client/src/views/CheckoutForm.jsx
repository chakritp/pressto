import React from 'react'
import {injectStripe} from 'react-stripe-elements'

import CardSection from './CardSection'

class CheckoutForm extends React.Component {
  handleSubmit(evt) {
    evt.preventDefault()
    this.props.stripe.createToken({name: 'Jenny Rosen'}).then(({token}) => {
      console.log('Received Stripe Token:', token)
    })
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
        <CardSection />
        <button>Confirm Order</button>
      </form>
    )
  }
}

export default injectStripe(CheckoutForm)