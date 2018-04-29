import React from 'react'
import { Query } from 'react-apollo'
import { Table } from 'antd'

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

const Investments = ({ data }) => {
  return <Table dataSource={data} columns={columns} />
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
