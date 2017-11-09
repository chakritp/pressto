import React from 'react'
import axios from 'axios'

class ProductIndex extends React.Component {
  state = {
    products: []
  }
  
  componentDidMount() {
    axios({
      method: 'get',
      url: '/api/products',
    })
    .then(res => {
      console.log(res.data.products)
      this.setState({
        products: res.data.products  
      })
    })
  }

  render() {
    return(
      <div className="ProductIndex">
        <h1>Products</h1>
        {this.state.products.map((product) => {
          return (
            <div key={product._id}>
              Name: {product.name} <br/>
              Price: ${product.price} <br/>
              Description: {product.description} <br/>
              Category: {product.category} <br/>
              <button>Edit</button>
              <button>Delete</button>
              <hr/>
            </div>
          )
        })}
      </div>
    )
  }
}

export default ProductIndex