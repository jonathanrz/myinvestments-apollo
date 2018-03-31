import React from 'react'
import { graphql } from 'react-apollo'
import { withRouter } from 'react-router-dom'
import { Form, Icon, Input, Button } from 'antd'

import mutation from '../mutations/Login'

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
            this.setState({ errors })
          })
      }
    })
  }
  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <Form.Item>
          {getFieldDecorator('email', {
            rules: [{ required: true, message: 'Informe o seu e-mail!' }]
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Email"
            />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Por favor informe a sua senha' }]
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="Senha"
            />
          )}
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Entrar
          </Button>
        </Form.Item>
      </Form>
    )
  }
}

const WrappedNormalLoginForm = Form.create()(NormalLoginForm)

export default withRouter(graphql(mutation)(WrappedNormalLoginForm))
