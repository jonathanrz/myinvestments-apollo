import React from 'react'
import styled from 'styled-components'
import { graphql } from 'react-apollo'
import { withRouter } from 'react-router-dom'
import { Form, Icon, Input, Button, message } from 'antd'

import mutation from '../mutations/Login'

const Container = styled.div`
  max-width: 600px;
  margin: auto;
  margin: 25px;
`

class NormalLoginForm extends React.Component {
  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const { email, password } = values

        this.props
          .mutate({
            variables: { email, password }
          })
          .then(async ({ data }) => {
            const { login } = data
            if (login) {
              localStorage.setItem('token', `Bearer ${login}`)
              this.props.history.push('/')
            }
          })
          .catch(res => {
            const errors = res.graphQLErrors.map(error => error.message)
            message.error(errors)
          })
      }
    })
  }

  getRequiredFieldDecorator = (fieldName, message) =>
    this.props.form.getFieldDecorator(fieldName, { rules: [{ required: true, message }] })

  render() {
    return (
      <Container>
        <Form onSubmit={this.handleSubmit}>
          <Form.Item>
            {this.getRequiredFieldDecorator('email', 'Por favor informe o seu e-mail')(
              <Input
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="Email"
              />
            )}
          </Form.Item>
          <Form.Item>
            {this.getRequiredFieldDecorator('password', 'Por favor informe a sua senha')(
              <Input
                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                type="password"
                placeholder="Senha"
              />
            )}
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Entrar
            </Button>
          </Form.Item>
        </Form>
      </Container>
    )
  }
}

const WrappedNormalLoginForm = Form.create()(NormalLoginForm)

export default withRouter(graphql(mutation)(WrappedNormalLoginForm))
