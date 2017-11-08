import React from 'react'
import axios from 'axios'

class Order extends React.Component {
  state = {
    orders: []
  }

  componentDidMount() {
    axios({
      url: '/api/orders',
      method: 'get'
    }).then((res) => {
      console.log(res.data.orders)
      this.setState({
        orders: res.data.orders
      })
    })
  }

  render() {
    return (
      <div className="Order">
        <h1>Orders</h1>
        {this.state.orders.length === 0
        ? ( <div>There are no existing orders...</div> )
        : (
            <div className="orders-list">
              {this.state.orders.map(order => {
                return (
                  <div key={order._id}>
                    Stripe Id: {order.stripeId} <br/>
                    Customer Name: {order.customer.name} <br/>
                    Telephone: {order.customer.telephone} <br/>
                    Items:
                    <ul>
                      {order.items.map((item) => {
                        return (<li key={item._id}>{item.product} (QTY: {item.quantity}) </li>)
                      })} <br/>
                    </ul>
                    Date: {order.createdAt}
                  </div>
                )
              })}
            </div>
          )
        }
      </div>
    )
  }
}

export default Order