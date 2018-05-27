import React from 'react'
import styled from 'styled-components'
import { Query } from 'react-apollo'

import Loader from 'app/components/Loader'
import DateField from 'app/components/DateField'
import FieldWithLabel from 'app/components/FieldWithLabel'
import Table from 'app/components/Table'
import query from 'app/queries/Investment'
import { fromTheme } from 'app/utils/theme'

const Page = styled.div`
  margin: ${fromTheme('spacing.default')};
`

const TableContainer = styled.div`
  margin-top: ${fromTheme('spacing.default')};
`

const Details = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  * {
    margin-right: ${fromTheme('spacing.default')};
  }
`

const columns = [
  { title: 'Data', key: 'date' },
  { title: 'Quantidade', key: 'quantity' },
  { title: 'Valor', key: 'value' },
  { title: 'Comprado', key: 'bought' },
  { title: 'Vendido', key: 'sold' },
  { title: 'Rendimento', key: 'gross' },
  { title: 'IR', key: 'ir' },
  { title: 'Taxa', key: 'fee' }
]

const Investment = ({ data }) => {
  return (
    <Page>
      <Details>
        <FieldWithLabel label="Nome" field={data.name} />
        <FieldWithLabel label="Tipo" field={data.type} />
        <FieldWithLabel label="Detentor" field={data.holder} />
        <FieldWithLabel label="Objetivo" field={data.objective} />
        <DateField label="Data Vencimento" date={data.dueDate} />
      </Details>
      <TableContainer>
        <Table data={data.incomes} columns={columns} />
      </TableContainer>
    </Page>
  )
}

const InvestmentQuery = ({ uuid }) => (
  <Query query={query} variables={{ uuid }}>
    {({ loading, error, data }) => {
      if (loading) return <Loader message={'Buscando investimento'} />
      if (error) return error.map(error => <div key={error}>{error.message}</div>)
      return <Investment data={data.investment} />
    }}
  </Query>
)

export default InvestmentQuery
