import React from 'react'
import Login from './components/layout/LoginSignup/Login'
import Signup from './components/layout/LoginSignup/Signup'
import LoginSignup from './components/layout/LoginSignup/index'
import Content from './components/layout/Content'
import {AuthProvider} from './Auth'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import PrivateRoute from './Routes/PrivateRoute'

//MATERIAL IMPORTS
import {MuiThemeProvider} from '@material-ui/core'
import MyTheme from './MyTheme' // importing my theme palette

function App() {
  return (
    //AuthProvider everything below it, will have acess to currentUser through the context API
    //In our case if we logged in we will have user Object with all the description, and if we log out we have null or undefined
    <MuiThemeProvider theme={MyTheme}>
      <AuthProvider>
        <Router>
          <div>
            <PrivateRoute exact path="/" component={Content} />
            <Route exact path="/login" component={LoginSignup} />
            <Route exact path="/signup" component={Signup} />
          </div>
        </Router>
      </AuthProvider>
    </MuiThemeProvider>
  )
}

export default App
