import React from 'react'
import { Mutation, Query } from 'react-apollo'
import { Redirect } from 'react-router-dom'
import { get } from 'lodash'

import requireAuth from 'app/lib/requireAuth'
import query from 'app/queries/Income'
import mutation from 'app/mutations/UpdateIncome'
import Layout from 'app/components/Layout'
import Loader from 'app/components/Loader'

import Form from 'app/components/Income/Form'

class EditIncomePage extends React.Component {
  updateIncome = data => {
    this.props.updateIncome({
      variables: { uuid: this.props.match.params.uuid, data }
    })
  }

  renderErrors = errors => errors.map(error => <div key={error}>{error.message}</div>)

  render() {
    const { response, match } = this.props

    const investmentUuid = get(response, 'data.updateIncome.investment.uuid')

    return (
      <Layout title="Editar Rendimento">
        {response.loading ? (
          <Loader message={'Salvando rendimento'} />
        ) : response.errors ? (
          this.renderErrors(response.errors)
        ) : response.data ? (
          <Redirect
            to={{
              pathname: `/investment/${investmentUuid}`,
              state: { uuid: investmentUuid }
            }}
            push
          />
        ) : (
          <Query query={query} variables={{ uuid: match.params.uuid }}>
            {({ loading, error, data }) => {
              if (loading) return <Loader message={'Buscando rendimento'} />
              if (error) return error.map(error => <div key={error}>{error.message}</div>)
              return <Form onSubmit={this.updateIncome} income={data.income} />
            }}
          </Query>
        )}
      </Layout>
    )
  }
}

const Page = requireAuth(EditIncomePage)

const ConnectedEditIncomePage = ({ match }) => (
  <Mutation
    mutation={mutation}
    refetchQueries={[{ query, variables: { uuid: match.params.uuid } }]}
  >
    {(updateIncome, response) => <Page updateIncome={updateIncome} response={response || {}} />}
  </Mutation>
)

export default ConnectedEditIncomePage
