import React from 'react'
import io from 'socket.io-client'

// for url may have to use conditional domain (i.e. localhost for dev, or url for production)
// const socketUrl = process.env.REACT_APP_SOCKET_URL || 'http://localhost:3000'
// const socket = openSocket(socketUrl)

class CurrentOrder extends React.Component {
  state = {
    pendingOrders: [],
    inProgressOrders: [],
    doneOrders: []
  }
  
  componentDidMount() {
    this.socketio = io()


    this.socketio.emit('connect', (data) => {
      console.log('Connected to server')
    })

    // socket listener
    this.socketio.on('new-order', (data) => {
      console.log('order', data)
      this.setState({
        pendingOrders: [...this.state.pendingOrders, data]
      })
    })

    this.socketio.on('orders', (data) => {
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
  
  componentWillUnmount() {
    // close socket connection
    console.log('unmounting')
    this.socketio.disconnect()
  }

  // Handlers for button clicks
  onMoveToInProgress(id) {
    //emit socket event to update status of order to inprogress (send id)
    this.socketio.emit('move-to-inprogress', id)
  }

  onMoveToDone(id) {
    //emit socket event to update status of order to done (send id)
    this.socketio.emit('move-to-done', id)
  }

  onMoveToArchive(id) {
    //emit socket event to update status of order to archive (send id)
    this.socketio.emit('move-to-archive', id)
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
                <b>#{order.id} - {order.customer.name}</b>
                <ul className="orders">
                  {order.items.map((item) => {
                    return <li key={item._id}>{item.quantity} {item.product.name}</li>
                  })}
                </ul>
                {this.props.currentUser ? <button onClick={() => { this.onMoveToInProgress(order._id) }}>Move to In Progress</button> : null}
              </div>
            )
          })}
        </div>
        <div className="in-progress">
          <h2>In Progress</h2>
          
          {this.state.inProgressOrders.map((order) => {
            return (
              <div key={order._id}>
                <b>#{order.id}- {order.customer.name}</b>
                <ul className="orders">
                  {order.items.map((item) => {
                    return <li key={item._id}>{item.quantity} {item.product.name}</li>
                  })}
                </ul>
                {this.props.currentUser ? <button onClick={() => { this.onMoveToDone(order._id) }}>Move to Done</button> : null}
              </div>
            )
          })}
        </div>
        <div className="done">
          <h2>Ready For Pickup</h2>

          {this.state.doneOrders.map((order) => {
            return (
              <div key={order._id}>
                <b>#{order.id}- {order.customer.name}</b>
                <ul className="orders">
                  {order.items.map((item) => {
                    return <li key={item._id}>{item.quantity} {item.product.name}</li>
                  })}
                </ul>
                {this.props.currentUser ? <button onClick={() => { this.onMoveToArchive(order._id) }}>Archive</button> : null}
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}

export default CurrentOrder