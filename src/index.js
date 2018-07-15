import React from 'react'
import { render } from 'react-dom'
import { HashRouter as Router, Route } from 'react-router-dom'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'

import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Investment from './pages/Investment'
import NewInvestment from './pages/NewInvestment'
import EditInvestment from './pages/EditInvestment'
import EditIncome from './pages/EditIncome'

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
        <Route exact path="/" component={Dashboard} />
        <Route path="/login" component={Login} />
        <Route path="/new-investment" component={NewInvestment} />
        <Route path="/investment/:uuid/edit" component={EditInvestment} />
        <Route path="/investment/:uuid" component={Investment} />
        <Route path="/income/:uuid/edit" component={EditIncome} />
      </div>
    </Router>
  </ApolloProvider>
)

render(<ApolloApp />, document.querySelector('#app'))
