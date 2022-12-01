import {Component} from 'react'

import './index.css'

class Login extends Component {
  state = {username: '', password: ''}

  submit = props => {
    const {history} = props
    history.push('/')
  }

  error = error => {
    console.log(error)
  }

  user = event => {
    this.setState({username: event.target.value})
  }

  pass = e => {
    this.setState({password: e.target.value})
  }

  give = async e => {
    e.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const option = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, option)
    const data = await response.json()
    console.log(response)
  }

  render() {
    return (
      <div className="con">
        <div className="container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt=" website logo"
          />
          <form onSubmit={this.give}>
            <div className="form">
              <label htmlFor="user">UserName</label>
              <input type="text" id="user" onChange={this.user} />
            </div>
            <div className="form">
              <label htmlFor="password">Password</label>
              <input type="password" id="password" onChange={this.pass} />
            </div>
          </form>
          <button type="submit">Login</button>
        </div>
      </div>
    )
  }
}
export default Login
