import React from 'react'
import axios from 'axios'

class OrderConfirmation extends React.Component {
  state = {
    order: null
  }

  componentDidMount() {
    console.log(this.props.match.params.id)
    axios({
      url: `/api/orders/${this.props.match.params.id}`,
      method: 'get'
    }).then(res => {
      console.log(res)
      this.setState({
        order: res.data.order
      })
    })
  }

  render() {
    return (
      <div className="OrderConfirmation">
        <h1>Order Confirmation</h1>
        {!this.state.order
        ? (
            <div>Loading...</div>
          )
        : (
            <div>
              <p>You have successfully placed your order, {this.state.order.customer.name}</p>
              <p>Your order number is: #{this.state.order.id}</p>
              <hr/>
              <h2>Order Details</h2>
              {this.state.order.items.map(item => {
                return <div key={item._id}>{item.quantity} {item.product.name}</div>
              })}
            </div>
          )
        }
      </div>
    )
  }
}

export default OrderConfirmation