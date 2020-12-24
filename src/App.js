import React, { Component } from 'react'
import { Segment } from 'semantic-ui-react'
import SignIn from './features/user/signIn'
import Navigation from './features/navigation'

const pages = {
  signIn: <SignIn/>,
  appointments: <p>TODO: Appointments here</p>
}

class App extends Component {
  state = {
    activePage: 'appointments',
    signedIn: false
  }

  onNavigationChange = (activePage) => {
    this.setState({ activePage })
  }

  render () {
    const { activePage, signedIn} = this.state
    return (
      <>
        <Navigation show={signedIn} activePage={activePage} onChange={this.onNavigationChange}/>
        <Segment>
          { !signedIn && <SignIn onSignIn={token => {
            localStorage.setItem('token', token)
            this.setState({ signedIn: true })
          }} /> }
          { signedIn && pages[activePage]}
        </Segment>
      </>
    )
  }
}

export default App

