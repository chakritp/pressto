import React from 'react'
import axios from 'axios'

class ProductEdit extends React.Component {
  state = {
    product: null,
  }

  componentDidMount() {
    console.log('/api/products/' + this.props.match.params.id)
    axios({
      method: 'get',
      url: '/api/products/' + this.props.match.params.id
    }).then(res => {
      console.log(res.data.product)
      this.setState({
        product: res.data.product,
      })
    })
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
    const product = this.state.product
    const fields = {
      name: product.name,
      price: product.price,
      category: product.category,
      description: product.description,
      image: product.image
    }
    axios({
      method: 'patch',
      url: '/api/products/' + product._id,
      data: fields
    }).then(res => {
      this.props.history.push('/products')
    })
  }

  render() {
    const { product } = this.state
    if(!product) return <div>Loading...</div>
    return (
      <div className="ProductEdit">
        <h1>Edit Product</h1>
          <form onChange={this.onFormChange.bind(this)} onSubmit={this.onFormSubmit.bind(this)}>
            <div className="field">
              <label className="label">Name</label>
              <div className="control">
                <input className="input" type="text" name="name" placeholder="Name" defaultValue={product.name} />
              </div>
            </div>
            <div className="field">
              <label className="label">Price</label>
              <div className="control">
                <input className="input" type="number" step="0.01" name="price" placeholder="Price" defaultValue={product.price} /> <br />
              </div>
            </div>
            <div className="field">
              <label className="label">Category</label>
              <div className="control">
                <input className="input" type="text" name="category" placeholder="Category" defaultValue={product.category} /> <br />
              </div>
            </div>
            <div className="field">
              <label className="label">Description</label>
              <div className="control">
                <textarea className="textarea" placeholder="Description" name="description" defaultValue={product.description}  /> <br />
              </div>
            </div>
            <div className="field">
              <label className="label">Image URL</label>
              <div className="control">
                <input className="input" type="text" name="image" placeholder="Image URL" defaultValue={product.image} /> <br />
              </div>
            </div>
            {this.state.product && this.state.product.image
              ? (<div>
                <img src={this.state.product.image} alt={this.state.product.image} style={{ width: '300px' }} /> <br />
              </div>)
              : (null)}
            <button className="button is-success">Edit Product</button>
          </form>
      </div>
    )
  }
}

export default ProductEdit