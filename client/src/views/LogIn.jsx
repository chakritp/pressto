import React from 'react'
import clientAuth from '../clientAuth'

class LogIn extends React.Component {
  state = {
    fields: { email: '', password: '' }
  }

  onInputChange(evt) {
    this.setState({
      fields: {
        ...this.state.fields,
        [evt.target.name]: evt.target.value
      }
    })
  }

  onFormSubmit(evt) {
    evt.preventDefault()
    clientAuth.logIn(this.state.fields).then(user => {
      console.log(user)
      this.setState({ fields: { email: '', password: '' } })
      if(user) {
        this.props.onLoginSuccess(user)
        this.props.showSuccess("Login Successful")
        this.props.history.push('/order-history')
      }
      else {
        this.props.showError("Incorrect credentials")
      }
    })
  }

  render() {
    const { email, password } = this.state.fields
    return (
      <div className="LogIn">
        <h1>Log In</h1>
        <form onChange={this.onInputChange.bind(this)} onSubmit={this.onFormSubmit.bind(this)}>
          <div className="field">
            <label className="label">Email</label>
            <div className="control">
              <input className="input" type="text" placeholder="Email" name="email" value={email} />
            </div>
          </div>

          <div className="field">
            <label className="label">Password</label>
            <div className="control">
              <input className="input" type="password" placeholder="Password" name="password" value={password} />
            </div>
          </div>

          <button className="button is-success">Log In</button>
        </form>
      </div>
    )
  }
}

export default LogIn