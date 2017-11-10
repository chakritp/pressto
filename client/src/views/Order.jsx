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
            <table className="table orders-list">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Stripe ID</th>
                  <th>Customer Name</th>
                  <th>Telephone</th>
                  <th>Items</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {this.state.orders.map(order => {
                  return (
                    <tr key={order._id}>
                      <td>{order.id}</td>
                      <td>{order.stripeId}</td>
                      <td>{order.customer.name}</td>
                      <td>{order.customer.telephone}</td>
                      <td>
                        {order.items.map((item) => {
                          return item.product ? (<div key={item._id}>{item.product.name} (QTY: {item.quantity})</div>) : null
                        })}
                      </td>
                      <td>{moment(order.createdAt).format('MMMM Do YYYY, h:mm a')}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          )
        }
      </div>
    )
  }
}

export default Order