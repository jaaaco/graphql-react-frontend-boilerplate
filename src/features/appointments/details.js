import { useParams } from 'react-router-dom'
import { loader } from 'graphql.macro'
import { useQuery } from '@apollo/client'
import { Container, Header } from 'semantic-ui-react'

const QUERY = loader('./details.graphql')

const AppointmentDetails = () => {
  const { id } = useParams()
  const { data } = useQuery(QUERY, { variables: { id } })

  if (!data || !data.appointment) {
    return null
  }

  return (
    <Container>
      <Header>Appointment Details</Header>
      <p>
        {data.appointment.description} <br />
        {data.appointment.receiver.email}
      </p>
    </Container>
  )
}

export default AppointmentDetails
