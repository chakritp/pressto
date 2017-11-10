import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { confirmAlert } from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css'

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

  deleteProduct(product) {
    console.log(product)
    confirmAlert({
      title: 'Deleting ' + product.name,
      message: 'Are you sure you want to delete this product?',
      confirmLabel: 'Confirm',
      cancelLabel: 'Cancel',
      onConfirm: () => {
        axios({
          method: 'delete',
          url: '/api/products/' + product._id
        }).then(res => {
          this.setState({
            products: this.state.products.filter((product) => product._id != res.data.product._id)
          })
        })
      },
      onCancel: () => {
        return false
      }
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
              <Link to={`/products/${product._id}/edit`}>Edit</Link>
              <button onClick={() => { this.deleteProduct(product)}}>Delete</button>
              <hr/>
            </div>
          )
        })}
      </div>
    )
  }
}

export default ProductIndex