import React from 'react'
import { Link } from 'react-router-dom'
import logo from './images/logo.png'

class NavBar extends React.Component {
  state = {
    showNavbar: false
  }

  toggleNavbar() {
    this.setState({
      showNavbar: !this.state.showNavbar
    })
  }

  hideNavbar() {
    this.setState({
      showNavbar: false
    })
  }

  render() {
    return (
      <nav className="NavBar navbar">
        <div className="navbar-brand">
          <Link to="/" onClick={this.hideNavbar.bind(this)}>
            <img src={logo} alt="Logo" width="112" height="28" />
          </Link>

          <button className="button navbar-burger" onClick={this.toggleNavbar.bind(this)}>
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>

        <div className={`navbar-menu ${this.state.showNavbar ? 'is-active' : ''}`}>
          <div className="navbar-end">
            <Link className="navbar-item" to="/current-orders" onClick={this.hideNavbar.bind(this)}>View Current Orders</Link>

            {/* customer routes only */}
            {!this.props.currentUser ? <Link className="navbar-item" to="/menu" onClick={this.hideNavbar.bind(this)}>Menu</Link> : null }
            {!this.props.currentUser ? <Link className="navbar-item" to="/cart" onClick={this.hideNavbar.bind(this)}>View Cart</Link> : null }

            {/* admin protected routes */}
            {this.props.currentUser ? <Link className="navbar-item" to="/order-history" onClick={this.hideNavbar.bind(this)}>View Order History</Link> : null}
            {this.props.currentUser ? <Link className="navbar-item" to="/products" onClick={this.hideNavbar.bind(this)}>Manage Products</Link> : null}
            {this.props.currentUser ? <Link className="navbar-item" to="/logout" onClick={this.hideNavbar.bind(this)}>Log Out</Link> : null}
          </div>
        </div>
      </nav>
    )
  }
}

export default NavBar