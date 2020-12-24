/* eslint-disable react/jsx-closing-bracket-location */
import React from 'react'
import URLS from '../urls'
import { Redirect, useLocation } from 'react-router-dom'

const PrivateRoute = ({ signedIn, component: Component, ...rest }) => {
  let { pathname } = useLocation();
  if (!signedIn) {
    return (
      <Redirect to={{
        pathname: URLS.SIGN_IN,
        state: { from: pathname }
      }} />
    )
  }
  return <Component {...rest} />
}

export default PrivateRoute
