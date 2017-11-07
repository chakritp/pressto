import React from 'react'
import ReactDOM from 'react-dom'
import registerServiceWorker from './registerServiceWorker'
import { BrowserRouter as Router } from 'react-router-dom'
import { StripeProvider } from 'react-stripe-elements'

import App from './App';

ReactDOM.render(
  <Router>
    <StripeProvider apiKey={process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY}>
      <App />
    </StripeProvider>
  </Router>, document.getElementById('root'));

registerServiceWorker();
