import React, { useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { loader } from 'graphql.macro'
import { Form, Select } from 'semantic-ui-react'

const QUERY = loader('./select.graphql')

const UserSelect = ({ onChange, label = 'User', ...rest}) => {
  const { loading, error, data } = useQuery(QUERY)
  useEffect(() => {
    if (data && data.users.length) {
      console.info({ data })
      onChange(null, { value: data.users[0].id, name: rest.name })
    }
  }, [data])
  if (error || loading) return null



  return (
    <Form.Field
      {...rest}
      control={Select}
      onChange={onChange}
      label={label}
      options={data.users.map(({ id, email }) => ({ key: id, value: id, text: email }))}
      placeholder={label}
    />
  )
}

export default UserSelect
