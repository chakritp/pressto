import React from 'react'
import axios from 'axios'

class Menu extends React.Component {
  state = {
    menuItems: null
  }

  componentDidMount() {
    axios({method: 'get', url: '/api/menu-items'})
      .then(res => {
        var menuItems = res.data.menuItems
        console.log(menuItems)
        this.setState({
          menuItems: res.data.menuItems
        })
      })
  }

  render() {
    return (
      <div className="Menu">
        <h1>Menu</h1>
        { !this.state.menuItems
        ? (
            <div>Loading...</div>
          ) 
        : (
            <div className="menuItems">
              {this.state.menuItems.map(menuItem => {
                return (
                  <div key={menuItem._id} style={{marginBottom: '30px'}}>
                    <img src={menuItem.image} width="300" /> <br/>
                    <b>{menuItem.name}</b> <br/>
                    {menuItem.description} <br/>
                    <span>Quantity: <input type="number" defaultValue="1"/></span> <br/>
                    <button>Add to Cart</button>
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

export default Menu