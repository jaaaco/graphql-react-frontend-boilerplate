import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Button, Divider, Header, Icon, Segment, Table } from 'semantic-ui-react'
import _ from 'lodash'

import URLS from '../../urls'
import { useQuery } from '@apollo/client'
import { loader } from 'graphql.macro'
import AppointmentCreate from './create'
const QUERY = loader('./list.graphql')

const AppointmentList = () => {
  const { loading, error, data, refetch } = useQuery(QUERY)
  const [adding, setAdding] = useState(false)
  const history = useHistory()

  const addingModal = (
    <>
      { adding && <AppointmentCreate onComplete={() => {
        setAdding(false)
        refetch()
      }} onCancel={() => setAdding(false)} />}
    </>
  )

  if (!data || !data.appointments.length) {
    return (
      <Segment placeholder>
        { addingModal }
        <Header icon>
          <Icon name="user md" />
          No Appointments yet
          <Divider />
          <Button onClick={() => setAdding(true)} className="mt-5" primary>Create an Appointment</Button>
        </Header>
      </Segment>
    )
  }

  return (
    <>
      { addingModal }
      <Header as="h2">
        <Button style={{ float: 'right' }} onClick={() => setAdding(!adding)} className="mt-5" primary>Create an Appointment</Button>
        <Icon name="group" />
        <Header.Content>
          Appointments
          <Header.Subheader>{data.appointments.length} records</Header.Subheader>
        </Header.Content>
      </Header>
      <Table padded selectable fixed>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Start time</Table.HeaderCell>
            <Table.HeaderCell>Duration</Table.HeaderCell>
            <Table.HeaderCell>Description</Table.HeaderCell>
            <Table.HeaderCell>Receiver</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {data && data.appointments && data.appointments.map(
            ({ id, receiver, description, startTime, duration }) => (
              <Table.Row onClick={() => {
                history.push('/appointments/' + id)
              }} key={id}>
                <Table.Cell>{startTime}</Table.Cell>
                <Table.Cell>{duration} min</Table.Cell>
                <Table.Cell>{_.truncate(description, 64)}</Table.Cell>
                <Table.Cell>{receiver.email}</Table.Cell>
              </Table.Row>
            )
          )}
        </Table.Body>
      </Table>
    </>
  )
}

export default AppointmentList
