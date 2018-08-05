import React from 'react'
import styled from 'styled-components'
import { Query } from 'react-apollo'
import { orderBy } from 'lodash'

import Loader from 'app/components/Loader'
import Table from 'app/components/Table'
import query from 'app/queries/InvestmentsOfMonth'
import { fromTheme } from 'app/utils/theme'

const Page = styled.div`
  margin: ${fromTheme('spacing.default')};
`

const TableContainer = styled.div`
  margin-top: ${fromTheme('spacing.big')};
`

const columns = [
  { title: 'Nome', key: 'name', width: '20%', type: 'text' },
  { title: 'Tipo', key: 'type', width: '20%', type: 'text' },
  { title: 'Detentor', key: 'holder', width: '20%', type: 'text' },
  { title: 'Quantidade', key: 'lastIncome.quantity', width: '20%', type: 'number' },
  { title: 'Valor', key: 'lastIncome.value', width: '20%', type: 'currency' }
]

class InvestmentsOfMonth extends React.Component {
  render() {
    const { data } = this.props

    return (
      <Page>
        <TableContainer>
          <Table
            data={orderBy(data, ['holder', 'type', 'name'], ['asc', 'asc', 'asc'])}
            columns={columns}
          />
        </TableContainer>
      </Page>
    )
  }
}

const InvestmentsOfMonthQuery = ({ uuid }) => (
  <Query query={query} variables={{ uuid }} fetchPolicy="network-only">
    {({ loading, error, data }) => {
      if (loading) return <Loader message={'Buscando investimento'} />
      if (error) return error.map(error => <div key={error}>{error.message}</div>)
      return <InvestmentsOfMonth data={data.investmentsOfMonth} />
    }}
  </Query>
)

export default InvestmentsOfMonthQuery
