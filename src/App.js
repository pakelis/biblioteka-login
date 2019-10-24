import React from 'react'
import Login from './components/Login'
import Signup from './components/Signup'
import Home from './components/Home'
import {AuthProvider} from './Auth'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import PrivateRoute from './Routes/PrivateRoute'

//MATERIAL IMPORTS
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core'

const theme = createMuiTheme({})

function App() {
  return (
    //AuthProvider everything below it, will have acess to currentUser through the context API
    //In our case if we logged in we will have user Object with all the description, and if we log out we have null or undefined
    <MuiThemeProvider theme={theme}>
      <AuthProvider>
        <Router>
          <div>
            <PrivateRoute exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
          </div>
        </Router>
      </AuthProvider>
    </MuiThemeProvider>
  )
}

export default App
