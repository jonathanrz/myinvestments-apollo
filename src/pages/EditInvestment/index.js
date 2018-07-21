import React from 'react'
import { Mutation, Query } from 'react-apollo'
import { Redirect } from 'react-router-dom'
import { get } from 'lodash'

import requireAuth from 'app/lib/requireAuth'
import query from 'app/queries/Investment'
import mutation from 'app/mutations/UpdateInvestment'
import Layout from 'app/components/Layout'
import Loader from 'app/components/Loader'

import Form from 'app/components/Investment/Form'

class EditInvestmentPage extends React.Component {
  updateInvestment = data => {
    this.props.updateInvestment({
      variables: { uuid: this.props.match.params.uuid, data }
    })
  }

  renderErrors = errors => errors.map(error => <div key={error}>{error.message}</div>)

  render() {
    const { response, match } = this.props

    const investmentUuid = get(response.data, 'updateInvestment.uuid')

    return (
      <Layout title="Editar Investimento">
        {response.loading ? (
          <Loader message={'Salvando investimento'} />
        ) : response.errors ? (
          this.renderErrors(response.errors)
        ) : investmentUuid ? (
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
              if (loading) return <Loader message={'Buscando investimento'} />
              if (error) return error.map(error => <div key={error}>{error.message}</div>)
              return <Form onSubmit={this.updateInvestment} investment={data.investment} />
            }}
          </Query>
        )}
      </Layout>
    )
  }
}

const Page = requireAuth(EditInvestmentPage)

const ConnectedEditInvestmentPage = ({ match }) => (
  <Mutation
    mutation={mutation}
    refetchQueries={[{ query, variables: { uuid: match.params.uuid } }]}
  >
    {(updateInvestment, response) => (
      <Page updateInvestment={updateInvestment} response={response || {}} />
    )}
  </Mutation>
)

export default ConnectedEditInvestmentPage
