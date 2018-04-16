import React from 'react'
import { Mutation } from 'react-apollo'
import { withRouter } from 'react-router-dom'

import mutation from '../mutations/Login'

import Layout from 'app/components/Layout'
import LoginForm from 'app/components/LoginForm'

class Login extends React.Component {
  executeLogin = ({ email, password }) => {
    this.props.requestLogin({
      variables: { email, password }
    })
  }

  renderErrors = errors => errors.map(error => <div key={error}>{error.message}</div>)

  componentDidUpdate() {
    const { data } = this.props.response
    if (data) {
      localStorage.setItem('token', `Bearer ${data.login}`)
      this.props.history.push('/')
    }
  }

  render() {
    const { loading, errors } = this.props.response

    return (
      <Layout title="Entrar" sider={false} footer={false}>
        {loading ? (
          <div>Executando login</div>
        ) : errors ? (
          this.renderErrors(errors)
        ) : (
          <LoginForm executeLogin={this.executeLogin} />
        )}
      </Layout>
    )
  }
}

const Connected = ({ history }) => (
  <Mutation mutation={mutation}>
    {(requestLogin, response) => (
      <Login requestLogin={requestLogin} response={response || {}} history={history} />
    )}
  </Mutation>
)

export default withRouter(Connected)
