import React from 'react'
import { Link } from 'react-router-dom'

const NavBar = (props) => {
  return (
    <div className="NavBar">
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/menu">Menu</Link></li>
        <li><Link to="/cart">View Cart</Link></li>
        <li><Link to="/current-orders">View Current Orders</Link></li>

        {/* These two links will only be available for admin when signed in */}
        <li><Link to="/order-history">View Order History</Link></li>
        <li><Link to="/products">Manage Products</Link></li>
      </ul>
    </div>
  )
}

export default NavBar