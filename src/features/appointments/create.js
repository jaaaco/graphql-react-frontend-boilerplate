import { Button, Form, Grid, Modal } from 'semantic-ui-react'
import { useState} from 'react'
import moment from 'moment'
import { DateTimeInput } from 'semantic-ui-calendar-react'
import { useHistory } from 'react-router-dom'
import URLS from '../../urls'
import { useMutation } from '@apollo/client'
import { loader } from 'graphql.macro'

const AppointmentCreate = () => {
  const dateFormat = 'YYYY-MM-DD @ HH:mm'
  const [appointmentsCreateMutation, { data, loading }] = useMutation(loader('./create.graphql'))
  const [fields, setFields] = useState({
    values: {
      startTime: moment().add(1, 'hour').startOf('hour').format(dateFormat),
      endTime: moment().add(1, 'hour').startOf('hour').add(30, 'minutes').format(dateFormat),
      description: ''
    }
  })
  const [errors, setErrors] = useState({})
  const history = useHistory()

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
    await appointmentsCreateMutation({ variables: fields.values })
    history.push(URLS.APPOINTMENTS)
  }

  return (
    <Modal open>
      <Modal.Content>
        <Form loading={loading}>
          <Form.Field>
            <label>Visit start time</label>
            <DateTimeInput
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
            autoFocus
            data-cy="description"
            value={fields.values.interview}
            label="Inne informacje"
            placeholder="Inne informacje"
            onChange={(_, data) => handleChange('interview', `${data.value}`)}
          />
          <Grid>
            <Grid.Row columns="2">
              <Grid.Column>
                <Button.Group>
                  <Button data-cy="appointment-save-button" onClick={handleSubmit} positive>
                    Save
                  </Button>
                  <Button.Or text="lub" />
                  <Button onClick={() => history.push(URLS.APPOINTMENTS)}>
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
