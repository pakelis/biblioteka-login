import React, {useContext} from 'react'
import {Route, Redirect} from 'react-router-dom'
import {AuthContext} from '../Auth'

//insite PrivateRoute we need to know what component we need to render if is authenticated
//So in we take all component and the rest of the props
const PrivateRoute = ({component: RouteComponent, ...rest}) => {
  const {currentUser} = useContext(AuthContext)

  return (
    <Route
      {...rest}
      render={
        routeProps =>
          //if we have user we render our route component
          !!currentUser ? (
            <RouteComponent {...routeProps} />
          ) : (
            <Redirect to={'/login'} />
          )
        //if we dont ,we render Redirect Component
      }
    />
  )
}

export default PrivateRoute
