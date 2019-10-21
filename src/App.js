import React from 'react'
import {Login} from './components/Login'
import Signup from './components/Signup'
import {Home} from './components/Home'
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom'
import {AuthProvider} from './Auth'

function App() {
  return (
    <AuthProvider>
      <Router>
        <div>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App
