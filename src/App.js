import React, { Component } from 'react'
import SignIn from './features/user/signIn'
import Appointments from './features/appointments'
import Navigation from './features/navigation'
import { Switch, Route, withRouter } from 'react-router-dom'
import { withApollo } from '@apollo/client/react/hoc'
import compose from 'lodash/flowRight'

import URLS from './urls'
import PrivateRoute from './features/PrivateRoute'

const Dashboard = () => <p>Dashboard HERE</p>

class App extends Component {
  render () {
    return (
      <>
        { this.user() && <Navigation isAdmin={this.user('ADMIN')} onSignOut={this.signOut}/>}
        <Switch>
          <Route path={URLS.SIGN_IN} component={() => {
            return <SignIn onSignIn={this.signIn} onSignUp={() => this.history.push(URLS.SIGN_UP)} />
          }} />
          <PrivateRoute signedIn={this.user()} path={URLS.HOME} component={Appointments}/>
          <PrivateRoute signedIn={this.user()} path={URLS.HOME} component={Dashboard}/>
        </Switch>
      </>
    )
  }

  signIn = ({ token, user } ) => {
    const { client, history } = this.props
    window.localStorage.setItem('user', JSON.stringify({ token, user }))
    client.resetStore().then(() => history.push(URLS.HOME))
  }

  signOut = () => {
    const { client, history } = this.props
    history.push(URLS.HOME)
    window.localStorage.removeItem('user')
    client.resetStore()
  }

  onError = e => {
    console.error(`Application Error: ${e.toString()}`)
    if (e?.graphQLErrors[0]?.message === 'not-authorized') {
      this.signOut()
    }
  }

  user = role => {
    try {
      const user = JSON.parse(window.localStorage.getItem('user'))
      if (!user) {
        return false
      }
      if (!role) {
        return true
      }
      return user.user.role === role
    } catch (e) {
      console.info(e)
      window.localStorage.removeItem('user')
      return false
    }
  }
}

export default compose(
  withRouter,
  withApollo
)(App)

