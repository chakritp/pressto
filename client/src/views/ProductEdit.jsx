import React from 'react'

class ProductEdit extends React.Component {
  state = {
    product: null
  }

  componentDidMount() {
    //this.props.match.params.id
  }

  render() {
    return (
      <div className="ProductEdit">
        <h1>Edit Product</h1>
      </div>
    )
  }
}

export default ProductEdit