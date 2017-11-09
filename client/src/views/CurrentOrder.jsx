import React from 'react'
import openSocket from 'socket.io-client'


const socket = openSocket('http://localhost:3002')

class CurrentOrder extends React.Component {
  state = {
    pendingOrders: [],
    inProgressOrders: [],
    doneOrders: []
  }

  componentDidMount() {
    socket.on('connect', () => {
      console.log('Connected to server')
    })

    // socket listener
    socket.on('orders', (data) => {
      console.log(data)
      var pendingOrders = []
      var inProgressOrders = []
      var doneOrders = []

      //initialize pending orders, in progress orders and done orders array
      for(var index in data) {
        switch(data[index].status) {
          case 'pending':
            pendingOrders.push(data[index])
            break;
          case 'in-progress':
            inProgressOrders.push(data[index])
            break;
          case 'ready':
            doneOrders.push(data[index])
            break;
        }
      }

      this.setState({
        pendingOrders: pendingOrders,
        inProgressOrders: inProgressOrders,
        doneOrders: doneOrders,
      })

    })
  }

  // Handlers for button clicks
  onMoveToInProgress(id) {
    //emit socket event to update status of order to inprogress (send id)
    socket.emit('move-to-inprogress', id)
    // update state
  }

  onMoveToDone(id) {
    //emit socket event to update status of order to done (send id)
    socket.emit('move-to-done', id)
    // update state
  }

  onMoveToArchive(id) {
    //emit socket event to update status of order to archive (send id)
    socket.emit('move-to-archive', id)
    // update state
  }
  
  render() {
    return (
      <div className="currentOrder">
        <h1>Pressto Orders</h1>
        <div className="pending">
          <h2>Pending</h2>

          {this.state.pendingOrders.map((order) => {
            return (
              <div key={order._id}>
                <b>{order.customer.name}</b>
                <ul className="orders">
                  {order.items.map((item) => {
                    return <li key={item._id}>{item.product.name} (QTY: {item.quantity})</li>
                  })}
                </ul>
                <button onClick={() => { this.onMoveToInProgress(order._id) }}>Move to In Progress</button>
              </div>
            )
          })}
        </div>
        <div className="in-progress">
          <h2>In Progress</h2>
          
          {this.state.inProgressOrders.map((order) => {
            return (
              <div key={order._id}>
                <b>{order.customer.name}</b>
                <ul className="orders">
                  {order.items.map((item) => {
                    return <li key={item._id}>{item.product.name} (QTY: {item.quantity})</li>
                  })}
                </ul>
                <button onClick={() => { this.onMoveToDone(order._id) }}>Move to Done</button>
              </div>
            )
          })}
        </div>
        <div className="done">
          <h2>Ready For Pickup</h2>

          {this.state.doneOrders.map((order) => {
            return (
              <div key={order._id}>
                <b>{order.customer.name}</b>
                <ul className="orders">
                  {order.items.map((item) => {
                    return <li key={item._id}>{item.product.name} (QTY: {item.quantity})</li>
                  })}
                </ul>
                <button onClick={() => { this.onMoveToArchive(order._id) }}>Archive</button>
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}

export default CurrentOrder