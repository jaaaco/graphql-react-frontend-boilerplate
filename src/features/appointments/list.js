import { useHistory } from 'react-router-dom'
import { Button, Divider, Header, Icon, Segment, Table } from 'semantic-ui-react'
import URLS from '../../urls'

const AppointmentList = () => {
  const appointments = []
  const history = useHistory()

  if (!appointments.length) {
    return (
      <Segment placeholder>
        <Header icon>
          <Icon name="user md" />
          No Appointments yet
          <Divider />
          <Button onClick={() => history.push(URLS.NEW_APPOINTMENT)} className="mt-5" primary>Create an Appointment</Button>
        </Header>
      </Segment>
    )
  }

  return (
    <>
      <Header as="h2">
        <Icon name="group" />
        <Header.Content>
          Appointments
          <Header.Subheader>{appointments.length} records</Header.Subheader>
        </Header.Content>
      </Header>
      <Table padded selectable fixed>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Start time</Table.HeaderCell>
            <Table.HeaderCell>Duration</Table.HeaderCell>
            <Table.HeaderCell>Description</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {appointments.map(
            ({ _id, description, startTime, duration }) => (
              <Table.Row onClick={() => {}} key={_id}>
                <Table.Cell>{startTime}</Table.Cell>
                <Table.Cell>{duration}</Table.Cell>
                <Table.Cell>{description}</Table.Cell>
              </Table.Row>
            )
          )}
        </Table.Body>
      </Table>
    </>
  )
}

export default AppointmentList
