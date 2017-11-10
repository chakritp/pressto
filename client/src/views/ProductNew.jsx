import React from 'react'
import axios from 'axios'

class ProductNew extends React.Component {
  state = {
    product: null
  }

  onFormChange(evt) {
    this.setState({
      product: {
        ...this.state.product,
        [evt.target.name]: evt.target.value
      }
    })
  }

  onFormSubmit(evt) {
    evt.preventDefault()
    console.log(this.state.product)
    axios({
      method: 'post',
      url: '/api/products',
      data: this.state.product
    }).then(res => {
      this.props.history.push('/products')
    })
  }

  render() {
    return (
      <div className="ProductNew">
        <h1>New Product</h1>
        <form onChange={this.onFormChange.bind(this)} onSubmit={this.onFormSubmit.bind(this)}>
          <input type="text" name="name" placeholder="Name" /> <br />
          <input type="number" step="0.01" name="price" placeholder="Price" /> <br />
          <input type="text" name="category" placeholder="Category" /> <br />
          <textarea placeholder="Description" name="description" /> <br />
          <input type="text" name="image" placeholder="Image URL" /> <br />
          {this.state.product && this.state.product.image
          ? (<div>
              <img src={this.state.product.image} alt={this.state.product.image} style={{ width: '300px' }} /> <br />
            </div>)
          : (null)}
          <button>Create Product</button>
        </form>
      </div>
    )
  }
}

export default ProductNew