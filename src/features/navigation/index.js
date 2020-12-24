import React from 'react'
import { Menu } from 'semantic-ui-react'

const Navigation = ({ show, onChange, activeItem }) => {
  if (!show) return null
  return (
    <Menu>
      <Menu.Item
        name='appointments'
        active={activeItem === 'appointments'}
        onClick={onChange}
      >
        Appointments
      </Menu.Item>

      <Menu.Item
        name='users'
        active={activeItem === 'users'}
        onClick={onChange}
      >
        Users
      </Menu.Item>

      <Menu.Item
        onClick={() => {}}
      >
        Sign Out
      </Menu.Item>
    </Menu>
  )
}

export default Navigation
