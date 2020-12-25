import React from 'react'
import { Menu } from 'semantic-ui-react'
import { useLocation, useHistory } from 'react-router-dom'
import URLS from '../../urls'

const Navigation = ({ onSignOut, isAdmin, isExternal }) => {
  const location = useLocation()
  const history = useHistory()

  function navigate(_, { name }) {
    history.push(name)
  }

  return (
    <Menu>
      <Menu.Item
        name={URLS.HOME}
        active={location.pathname === URLS.HOME}
        onClick={navigate}
      >
        Dashboard
      </Menu.Item>
      { isExternal && <Menu.Item
        name={URLS.EXTRA}
        active={location.pathname === URLS.EXTRA}
        onClick={navigate}
      > EXTRA </Menu.Item> }
      <Menu.Item
        name={URLS.APPOINTMENTS}
        active={location.pathname === URLS.APPOINTMENTS}
        onClick={navigate}
      >
        Appointments
      </Menu.Item>

      { isAdmin && <Menu.Item
        name={URLS.USERS}
        active={location.pathname === URLS.USERS}
        onClick={navigate}
      >
        Users
      </Menu.Item> }

      <Menu.Item onClick={onSignOut}>
        Sign Out
      </Menu.Item>
    </Menu>
  )
}

export default Navigation
