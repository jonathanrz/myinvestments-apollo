import React from 'react'
import { render } from 'react-dom'
import { HashRouter as Router, Route } from 'react-router-dom'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles'

import { muiTheme } from 'app/theme'

import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Investment from './pages/Investment'
import NewInvestment from './pages/NewInvestment'
import EditInvestment from './pages/EditInvestment'
import NewIncome from './pages/NewIncome'
import EditIncome from './pages/EditIncome'
import ImportIncomes from './pages/ImportIncomes'
import InvestmentsOfMonth from './pages/InvestmentsOfMonth'

const theme = createMuiTheme(muiTheme)

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
  <MuiThemeProvider theme={theme}>
    <ApolloProvider client={client}>
      <Router>
        <div>
          <Route exact path="/" component={Dashboard} />
          <Route path="/login" component={Login} />
          <Route path="/new-investment" component={NewInvestment} />
          <Route path="/investment/:uuid/edit" component={EditInvestment} />
          <Route path="/investment/:uuid/add-income" component={NewIncome} />
          <Route path="/investment/:uuid/import-incomes" component={ImportIncomes} />
          <Route path="/investment/:uuid" component={Investment} />
          <Route path="/income/:uuid/edit" component={EditIncome} />
          <Route path="/investmentsOfMonth" component={InvestmentsOfMonth} />
        </div>
      </Router>
    </ApolloProvider>
  </MuiThemeProvider>
)

render(<ApolloApp />, document.querySelector('#app'))
