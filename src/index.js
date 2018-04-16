import React from 'react'
import { render } from 'react-dom'
import { HashRouter as Router, Route } from 'react-router-dom'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'

import Login from './pages/Login'

import Dashboard from './components/Dashboard'
import requireAuth from './components/requireAuth'

const client = new ApolloClient({
  uri: __MYINVESTMENTS_API__, //eslint-disable-line no-undef
  request: async operation => {
    const token = localStorage.getItem('token')
    if (token) {
      operation.setContext({
        headers: {
          authorization: token
        }
      })
    }
  }
})

const ApolloApp = () => (
  <ApolloProvider client={client}>
    <Router>
      <div>
        <Route exact path="/" component={requireAuth(Dashboard)} />
        <Route path="/login" component={Login} />
      </div>
    </Router>
  </ApolloProvider>
)

render(<ApolloApp />, document.querySelector('#app'))
