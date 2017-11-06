import React from 'react'
import { Link } from 'react-router-dom'

const NavBar = (props) => {
  return (
    <div className="NavBar">
      <ul>
        <li>Home</li>
        <li>Sign In</li>
        <li>View Cart</li>
      </ul>
    </div>
  )
}

export default NavBar