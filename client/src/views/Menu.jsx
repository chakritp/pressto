import React from 'react'
import axios from 'axios'

class Menu extends React.Component {
  state = {
    products: null
  }

  componentDidMount() {
    axios({method: 'get', url: '/api/products'})
      .then(res => {
        var menuItems = res.data.products
        console.log(menuItems)
        this.setState({
          products: res.data.products
        })
      })
  }

  render() {
    return (
      <div className="Menu">
        <h1>Menu</h1>
        { !this.state.products
        ? (
            <div>Loading...</div>
          ) 
        : (
            <div className="menuItems">
              {this.state.products.map(product => {
                return (
                  <div key={product._id} style={{marginBottom: '30px'}}>
                    <img src={product.image} width="300" /> <br/>
                    <b>{product.name}</b> <br/>
                    {product.description} <br/>
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