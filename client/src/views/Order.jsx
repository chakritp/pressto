import React from 'react'
import axios from 'axios'
import moment from 'moment'

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
                  <div key={order._id} className="order-box">
                    Stripe Id: {order.stripeId} <br/>
                    Customer Name: {order.customer.name} <br/>
                    Telephone: {order.customer.telephone} <br/>
                    Items:
                    <ul>
                      {order.items.map((item) => {
                        
                        return item.product ? (<li key={item._id}>{item.product.name} (QTY: {item.quantity}) </li>) : null
                      })} <br/>
                    </ul>
                    Date: {moment(order.createdAt).format('MMMM Do YYYY, h:mm a')}
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