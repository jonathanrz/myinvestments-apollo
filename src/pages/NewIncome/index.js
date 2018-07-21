import React from 'react'
import { Mutation } from 'react-apollo'
import { Redirect } from 'react-router-dom'

import requireAuth from 'app/lib/requireAuth'
import mutation from 'app/mutations/CreateIncome'
import Layout from 'app/components/Layout'
import Loader from 'app/components/Loader'

import Form from 'app/components/Income/Form'

class NewIncomePage extends React.Component {
  createIncome = data => {
    this.props.createIncome({
      variables: { data, investmentUuid: this.props.match.params.uuid }
    })
  }

  renderErrors = errors => errors.map(error => <div key={error}>{error.message}</div>)

  render() {
    const { match } = this.props
    const { loading, errors, data } = this.props.response

    return (
      <Layout title="Novo Rendimento">
        {loading ? (
          <Loader message={'Criando rendimento'} />
        ) : errors ? (
          this.renderErrors(errors)
        ) : data ? (
          <Redirect
            to={{
              pathname: `/investment/${match.params.uuid}`,
              state: { uuid: match.params.uuid }
            }}
            push
          />
        ) : (
          <Form onSubmit={this.createIncome} />
        )}
      </Layout>
    )
  }
}

const Page = requireAuth(NewIncomePage)

const ConnectedNewIncomePage = () => (
  <Mutation mutation={mutation}>
    {(createIncome, response) => <Page createIncome={createIncome} response={response || {}} />}
  </Mutation>
)

export default ConnectedNewIncomePage
