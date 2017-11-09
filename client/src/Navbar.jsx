import React from 'react'
import { Link } from 'react-router-dom'

const NavBar = (props) => {
  return (
    <div className="NavBar">
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/current-orders">View Current Orders</Link></li>
        {!props.currentUser
        ? (
            <span>
              <li><Link to="/menu">Menu</Link></li>
              <li><Link to="/cart">View Cart</Link></li>
            </span>
          )
        : ( //admin is logged in
            <span>
              <li><Link to="/order-history">View Order History</Link></li>
              <li><Link to="/products">Manage Products</Link></li>
              <li><Link to="/logout">Log Out</Link></li>
            </span>
          )
        }

        
      </ul>
    </div>
  )
}

export default NavBar