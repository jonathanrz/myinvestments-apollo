import React from 'react'
import styled from 'styled-components'
import { Query } from 'react-apollo'
import { Redirect } from 'react-router-dom'
import { orderBy } from 'lodash'

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
  margin-top: ${fromTheme('spacing.big')};
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
  { title: 'Data', key: 'date', width: '12.5%', type: 'date' },
  { title: 'Quantidade', key: 'quantity', width: '12.5%', type: 'number' },
  { title: 'Valor', key: 'value', width: '12.5%', type: 'currency' },
  { title: 'Comprado', key: 'bought', width: '12.5%', type: 'currency' },
  { title: 'Vendido', key: 'sold', width: '12.5%', type: 'currency' },
  { title: 'Rendimento', key: 'gross', width: '12.5%', type: 'currency' },
  { title: 'IR', key: 'ir', width: '12.5%', type: 'currency' },
  { title: 'Taxa', key: 'fee', width: '12.5%', type: 'currency' }
]

class Investment extends React.Component {
  state = {
    redirectTo: undefined
  }

  render() {
    const { data } = this.props
    const { redirectTo } = this.state

    return redirectTo ? (
      <Redirect
        to={{
          pathname: `/income/${redirectTo}/edit`,
          state: { uuid: redirectTo }
        }}
        push
      />
    ) : (
      <Page>
        <Details>
          <FieldWithLabel label="Nome" field={data.name} />
          <FieldWithLabel label="Tipo" field={data.type} />
          <FieldWithLabel label="Detentor" field={data.holder} />
          <FieldWithLabel label="Objetivo" field={data.objective} />
          {data.dueDate && <DateField label="Data Vencimento" date={data.dueDate} />}
        </Details>
        <TableContainer>
          <Table
            data={orderBy(data.incomes, ['date'], ['desc'])}
            columns={columns}
            onRow={record => this.setState({ redirectTo: record.uuid })}
          />
        </TableContainer>
      </Page>
    )
  }
}

const InvestmentQuery = ({ uuid }) => (
  <Query query={query} variables={{ uuid }} fetchPolicy="network-only">
    {({ loading, error, data }) => {
      if (loading) return <Loader message={'Buscando investimento'} />
      if (error) return error.map(error => <div key={error}>{error.message}</div>)
      return <Investment data={data.investment} />
    }}
  </Query>
)

export default InvestmentQuery
