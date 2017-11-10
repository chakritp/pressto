import React from 'react'
import { Link } from 'react-router-dom'
import logo from './images/logo.png'

const NavBar = (props) => {
  return (
    <nav className="NavBar navbar">
      <div className="navbar-brand">
        <Link to="/">
          <img src={logo} alt="Logo" width="112" height="28" />
        </Link>
        <button className="button navbar-burger">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      <div className="navbar-menu">
        <div className="navbar-end">
          <Link className="navbar-item" to="/current-orders">View Current Orders</Link>

          {/* customer routes only */}
          {!props.currentUser ? <Link className="navbar-item" to="/menu">Menu</Link> : null }
          {!props.currentUser ? <Link className="navbar-item" to="/menu">View Cart</Link> : null }

          {/* admin protected routes */}
          {props.currentUser ? <Link className="navbar-item" to="/order-history">View Order History</Link> : null}
          {props.currentUser ? <Link className="navbar-item" to="/products">Manage Products</Link> : null}
          {props.currentUser ? <Link className="navbar-item" to="/logout">Log Out</Link> : null}
        </div>
      </div>
    </nav>
  )
}

export default NavBar