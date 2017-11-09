import React from 'react'
import axios from 'axios'

class ProductEdit extends React.Component {
  state = {
    product: null,
    fields: {
      name: '',
      price: '',
      category: '',
      description: '',
      image: ''
    }
  }

  componentDidMount() {
    //this.props.match.params.id
    // axios({
    //   method: 'get',

    // })
  }

  editProduct() {

  }

  render() {
    return (
      <div className="ProductEdit">
        <h1>Edit Product</h1>
        <form>
          <input type="text" placeholder=""/>
        </form>
      </div>
    )
  }
}

export default ProductEdit