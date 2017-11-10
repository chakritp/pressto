import React from 'react'
import axios from 'axios'

class Menu extends React.Component {
  state = {
    products: null
  }

  componentDidMount() {
    axios({method: 'get', url: '/api/products'})
      .then(res => {
        this.setState({
          products: res.data.products
        })
      })
  }

  onQuantityChange(evt) {
    if(evt.target.value <= 0) return (evt.target.value = 1)
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
            <div className="products">
              {this.state.products.map(product => {
                return (
                  <div key={product._id} style={{marginBottom: '30px'}}>
                    <img src={product.image} width="300" /> <br/>
                    <b>{product.name}</b> - ${product.price} <br/>
                    {product.description} <br/>
                    <span>Quantity: <input type="number" defaultValue="1" ref={product._id + "-quantity"} onChange={(evt) => { this.onQuantityChange(evt) }}/></span> <br/>
                    <button onClick={() => { this.props.onUpdateCart(product, this.refs[product._id + "-quantity"].value) }}>Add to Cart</button>
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