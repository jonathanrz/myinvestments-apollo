import React from 'react'
import { graphql } from 'react-apollo'
import { withRouter } from 'react-router-dom'

import mutation from '../mutations/Login'

class LoginForm extends React.Component {
  state = {
    email: '',
    password: '',
    errors: []
  }

  onSubmit = event => {
    event.preventDefault()

    const { email, password } = this.state

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

  render() {
    const { errors } = this.state

    return (
      <div>
        <h3>Login</h3>
        <div>
          <form onSubmit={this.onSubmit}>
            <input
              placeholder="Email"
              value={this.state.email}
              onChange={e => this.setState({ email: e.target.value })}
            />
            <input
              placeholder="Password"
              type="password"
              value={this.state.password}
              onChange={e => this.setState({ password: e.target.value })}
            />
            {errors.map(error => <div key={error}>{error}</div>)}
            <button>Login</button>
          </form>
        </div>
      </div>
    )
  }
}

export default withRouter(graphql(mutation)(LoginForm))
