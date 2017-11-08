import React from 'react'
import axios from 'axios'

class Order extends React.Component {
  state = {
    orders: []
  }

  componentDidMount() {

  }

  render() {
    return (
      <div className="Order">
        {this.state.orders.length === 0
        ? ( <div>There are no existing orders...</div> )
        : (
            <div className="orders-list">
              {this.state.orders.map(order => {
                <div key={order._id}>
                  Order
                </div>
              })}
            </div>
          )
        }
      </div>
    )
  }
}

export default Order