import {Switch, Route} from 'react-router-dom'

import Login from './components/Login'
import Home from './components/Home'
import NotFound from './components/NotFound'
import Jobs from './components/Jobs'

import './App.css'
// eslint-disable-next-line

// Replace your code here
const App = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/login" component={Login} />
    <Route path="/notfound" component={NotFound} />
    <Jobs />
  </Switch>
)

export default App
