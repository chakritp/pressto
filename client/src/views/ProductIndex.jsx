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
        <Link className="button is-success new-product" to='/products/new'>New Product + </Link>
        <table className="table is-bordered">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Image</th>
              <th>Price</th>
              <th>Description</th>
              <th>Category</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {this.state.products.map((product, index) => {
              return (
                <tr key={product._id}>
                  <td>{index + 1}</td>
                  <td>{product.name}</td>
                  <td><img src={product.image} alt={product.image} style={{ width: '100px' }} /></td>
                  <td>${product.price}</td>
                  <td>{product.description}</td>
                  <td>{product.category}</td>
                  <td>
                    <Link className="button is-warning" to={`/products/${product._id}/edit`}>Edit</Link>
                    <button className="button is-danger" onClick={() => { this.deleteProduct(product)}}>Delete</button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    )
  }
}

export default ProductIndex