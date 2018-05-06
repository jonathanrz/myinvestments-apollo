import React from 'react'
import { Query } from 'react-apollo'
import { Table } from 'antd'
import { Redirect } from 'react-router-dom'

import Loader from 'app/components/Loader'
import query from 'app/queries/Investments'

const columns = [
  {
    title: 'Nome',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: 'Tipo',
    dataIndex: 'type',
    key: 'type'
  },
  {
    title: 'Detentor',
    dataIndex: 'holder',
    key: 'holder'
  },
  {
    title: 'Objetivo',
    dataIndex: 'objective',
    key: 'objective'
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
        dataSource={data}
        columns={columns}
        onRow={record => {
          return {
            onClick: () => this.setState({ redirectTo: record.uuid })
          }
        }}
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
