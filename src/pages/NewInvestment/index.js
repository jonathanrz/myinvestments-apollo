import React from 'react'
import { Mutation } from 'react-apollo'
import { Redirect } from 'react-router-dom'
import { get } from 'lodash'

import requireAuth from 'app/lib/requireAuth'
import mutation from 'app/mutations/CreateInvestment'
import AppBar from 'app/components/AppBar'
import Loader from 'app/components/Loader'

import Form from 'app/components/Investment/Form'

class NewInvestmentPage extends React.Component {
  createInvestment = data => {
    this.props.createInvestment({
      variables: { data }
    })
  }

  renderErrors = errors => errors.map(error => <div key={error}>{error.message}</div>)

  render() {
    const { loading, errors, data } = this.props.response

    const newInvestmentUuid = get(data, 'createInvestment.uuid')

    return (
      <AppBar title="Novo Investimento">
        {loading ? (
          <Loader message={'Criando investimento'} />
        ) : errors ? (
          this.renderErrors(errors)
        ) : newInvestmentUuid ? (
          <Redirect
            to={{
              pathname: `/investment/${newInvestmentUuid}`,
              state: { uuid: newInvestmentUuid }
            }}
            push
          />
        ) : (
          <Form onSubmit={this.createInvestment} />
        )}
      </AppBar>
    )
  }
}

const Page = requireAuth(NewInvestmentPage)

const ConnectedNewInvestmentPage = () => (
  <Mutation mutation={mutation}>
    {(createInvestment, response) => (
      <Page createInvestment={createInvestment} response={response || {}} />
    )}
  </Mutation>
)

export default ConnectedNewInvestmentPage
