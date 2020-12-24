import { Button, Form, Grid, Modal } from 'semantic-ui-react'
import { useState} from 'react'
import moment from 'moment'
import { DateTimeInput } from 'semantic-ui-calendar-react'
import { useMutation } from '@apollo/client'
import { loader } from 'graphql.macro'
import UserSelect from '../user/select'

const MUTATION = loader('./create.graphql')

const AppointmentCreate = ({ onCancel, onComplete }) => {
  const dateFormat = 'YYYY-MM-DD @ HH:mm'
  const [appointmentsCreateMutation, { data, loading }] = useMutation(MUTATION)
  const [fields, setFields] = useState({
    values: {
      receiver: null,
      startTime: moment().add(1, 'hour').startOf('hour').format(dateFormat),
      endTime: moment().add(1, 'hour').startOf('hour').add(30, 'minutes').format(dateFormat),
      description: ''
    }
  })
  const [errors, setErrors] = useState({})

  const handleChange = async (field, value) => {
    setFields(state => ({
      values: { ...state.values, [field]: value }
    }))
  }

  const handleDateChange = (e, { name, value }) => {
    if (value) {
      const date = moment(value, dateFormat)
      if (date.isValid()) {
        handleChange(name, date.format('YYYY-MM-DD @ HH:mm'))
      } else {
        handleChange(name, '')
      }
    }
  }

  const handleSubmit = async () => {
    const { data } = await appointmentsCreateMutation({ variables: fields.values, refetchQueries: ['appointments'] })
    if (data.appointmentCreate.result.success) {
      onComplete()
    }
    setErrors(data.appointmentCreate.errors)
  }

  return (
    <Modal open>
      <Modal.Content>
        <Form loading={loading}>
          <UserSelect error={errors.receiver} selected={[fields.values.receiver]} name="receiver" onChange={(_, { name, value }) => {
            console.info({ name, value})
            handleChange(name, `${value}`)
          }}/>
          <Form.Field>
            <label>Visit start time</label>
            <DateTimeInput
              error={errors.startTime}
              duration={0}
              name="startTime"
              closable
              closeOnMouseLeave
              dateFormat="YYYY-MM-DD @ HH:mm"
              placeholder="Start Time"
              value={fields.values.startTime}
              iconPosition="right"
              popupPosition="bottom right"
              onChange={handleDateChange}
            />
          </Form.Field>
          <Form.Field>
            <label>Visit end time</label>
            <DateTimeInput
              error={errors.endTime}
              duration={0}
              name="endTime"
              closable
              closeOnMouseLeave
              dateFormat="YYYY-MM-DD @ HH:mm"
              placeholder="End Time"
              value={fields.values.endTime}
              iconPosition="right"
              popupPosition="bottom right"
              onChange={handleDateChange}
            />
          </Form.Field>
          <Form.TextArea
            error={errors.description}
            autoFocus
            name="description"
            value={fields.values.description}
            label="Description"
            placeholder="Description"
            onChange={(_, { name, value }) => handleChange(name, `${value}`)}
          />
          <Grid>
            <Grid.Row columns="2">
              <Grid.Column>
                <Button.Group>
                  <Button data-cy="appointment-save-button" onClick={handleSubmit} positive>
                    Save
                  </Button>
                  <Button.Or text="lub" />
                  <Button onClick={onCancel}>
                    Cancel
                  </Button>
                </Button.Group>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Form>
      </Modal.Content>
    </Modal>
  )
}

export default AppointmentCreate
