import React from 'react'

const Home = (props) => {
  return (
    <div className="Home">
      <div className="banner">
        <div className="heading">
          <h1>Welcome To Pressto</h1>
          <h2>"Ordering made easy"</h2>
        </div>
      </div>

      <div className="columns">
        <div className="column">
          <div className="card">
            <div className="cardImage">
              <span className="fa-stack fa-4x">
                <i className="fa fa-square fa-stack-2x"></i>
                <i className="fa fa-television fa-stack-1x fa-inverse"></i>
              </span>
            </div>

            <div className="card-content">
              <div className="media-content">
                <p className="title">Traceable</p>
              </div>
              <div className="content">
                Track your orders on a real-time feed with WebSocket technology
              </div>
            </div>
          </div>
        </div>

        <div className="column">
          <div className="card">
            <div className="cardImage">
              <span className="fa-stack fa-4x">
                <i className="fa fa-square fa-stack-2x"></i>
                <i className="fa fa-coffee fa-stack-1x fa-inverse"></i>
              </span>
            </div>
            
            <div className="card-content">
              <div className="media-content">
                <p className="title">Extensive</p>
              </div>
              <div className="content">
                Order from a wide variety of food and beverages
              </div>
            </div>
          </div>
        </div>

        <div className="column">
          <div className="card">
            <div className="cardImage">
              <span className="fa-stack fa-4x">
                <i className="fa fa-square fa-stack-2x"></i>
                <i className="fa fa-credit-card fa-stack-1x fa-inverse"></i>
              </span>
            </div>

            <div className="card-content">
              <div className="media-content">
                <p className="title">Convenient</p>
              </div>
              <div className="content">
                Convienently use your credit or debit card to make safe and secure purchases through the Stripe API
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home