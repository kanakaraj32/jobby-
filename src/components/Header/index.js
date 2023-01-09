import {Component} from 'react'

import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class Header extends Component {
  logout = () => {
    Cookies.remove('jwt_token')
    const {history} = this.props
    history.replace('/login')
  }

  render() {
    return (
      <nav className="nav-header">
        <div className="nav-content">
          <img
            className="website-logo"
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png "
            alt="website logo"
          />
          <ul className="nav-menu">
            <li className="li">
              <Link to="/" className="nav-link">
                Home
              </Link>
            </li>
            <li className="li">
              <Link to="/jobs" className="nav-link">
                jobs
              </Link>
            </li>
            <li>
              <button
                onClick={this.logout}
                type="button"
                className="logout-desktop-btn"
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      </nav>
    )
  }
}

export default withRouter(Header)
