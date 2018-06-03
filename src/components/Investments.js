import React from 'react'
import { Query } from 'react-apollo'
import { Redirect } from 'react-router-dom'

import Loader from 'app/components/Loader'
import Table from 'app/components/Table'
import query from 'app/queries/Investments'

const columns = [
  {
    title: 'Nome',
    key: 'name',
    width: '25%',
    type: 'text'
  },
  {
    title: 'Tipo',
    key: 'type',
    width: '25%',
    type: 'text'
  },
  {
    title: 'Detentor',
    key: 'holder',
    width: '25%',
    type: 'text'
  },
  {
    title: 'Objetivo',
    key: 'objective',
    width: '25%',
    type: 'text'
  }
]

class Investments extends React.Component {
  state = {
    redirectTo: undefined
  }

  render() {
    const { data } = this.props
    const { redirectTo } = this.state

    return redirectTo ? (
      <Redirect to={{ pathname: `/investment/${redirectTo}`, state: { uuid: redirectTo } }} />
    ) : (
      <Table
        data={data}
        columns={columns}
        onRow={record => this.setState({ redirectTo: record.uuid })}
      />
    )
  }
}

const InvestmentsQuery = () => (
  <Query query={query}>
    {({ loading, error, data }) => {
      if (loading) return <Loader message={'Buscando investimentos'} />
      if (error) return error.map(error => <div key={error}>{error.message}</div>)
      return <Investments data={data.investments} />
    }}
  </Query>
)

export default InvestmentsQuery
