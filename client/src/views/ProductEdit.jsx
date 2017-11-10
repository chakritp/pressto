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
            <input type="text" name="name" placeholder="Name" defaultValue={product.name} /> <br/>
            <input type="number" name="price" placeholder="Price" defaultValue={product.price} /> <br />
            <input type="text" name="category" placeholder="Category" defaultValue={product.category} /> <br />
            <textarea placeholder="Description" name="description" defaultValue={product.description} /> <br />
            <input type="text" name="image" placeholder="Image URL" defaultValue={product.image} /> <br />
            <img src={product.image} alt={product.image} style={{width: '300px'}} /> <br/>
            <button>Edit Product</button>
          </form>
      </div>
    )
  }
}

export default ProductEdit