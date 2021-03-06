import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { loader } from 'graphql.macro'
import { Grid, Form, Button, Icon, Header, Modal } from 'semantic-ui-react'

const MUTATION = loader('./signIn.graphql')

const SignIn = ({ onSignIn, onSignUp }) => {
  const [signInMutation] = useMutation(MUTATION)
  const [fields, setFields] = useState({
    values: {}
  })
  const [message, setMessage] = useState(false)

  const handleChange = async (_, { name: field, value }) => {
    setMessage(false)
    setFields(state => ({
      values: { ...state.values, [field]: value }
    }))
  }

  const handleSubmit = async () => {
    const { data: { signIn: { result, token, user } } } = await signInMutation({ variables: fields.values })
    if (result.success) {
      return onSignIn({ token, user })
    }
    setMessage(result.message)
  }

  return (
    <Modal open>
      <Modal.Content>
        <Header as="h2">
          <Icon name="user circle" />
          <Header.Content>
            Sign In
            <Header.Subheader>Log in to existing account</Header.Subheader>
          </Header.Content>
        </Header>
        <Form>
          <Form.Input name="email" onChange={handleChange} focus label="Email"/>
          <Form.Input error={message} name="password" onChange={handleChange} type="password" label="Password" />
          <Grid>
            <Grid.Row columns="2">
              <Grid.Column>
                <Button.Group>
                  <Button onClick={handleSubmit} positive>
                    Sign In
                  </Button>
                  <Button.Or text="or" />
                  <Button>
                    Register new account
                  </Button>
                </Button.Group>
              </Grid.Column>
              <Grid.Column textAlign="right">
                <Button
                  secondary
                  disabled
                  onClick={onSignUp}
                >
                  Forgot Password
                </Button>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Form>
      </Modal.Content>
    </Modal>
  )
}

export default SignIn
