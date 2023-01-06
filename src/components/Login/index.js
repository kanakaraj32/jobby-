import {Component} from 'react'

import Cookies from 'js-cookie'
import './index.css'

class Login extends Component {
  state = {username: '', password: '', error: '', istrue: false}

  sucess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    const {history} = this.props
    history.replace('/')
  }

  error = error => {
    this.setState({error, istrue: true})
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
    if (response.ok === true) {
      this.sucess(data.jwt_token)
    } else {
      this.error(data.error_msg)
    }

    console.log(data)
  }

  render() {
    const {istrue, error} = this.state
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
            <button type="submit">Login</button>
            {istrue && <p>{error}</p>}
          </form>
        </div>
      </div>
    )
  }
}
export default Login
