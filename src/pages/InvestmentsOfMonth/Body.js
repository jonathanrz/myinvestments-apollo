import React from 'react'
import styled from 'styled-components'
import { Query } from 'react-apollo'
import { orderBy } from 'lodash'

import Loader from 'app/common/Loader'
import Table from 'app/common/Table'
import query from 'app/queries/InvestmentsOfMonth'
import { fromTheme } from 'app/utils/theme'

import Form from './Form'

const Page = styled.div`
  margin: ${fromTheme('spacing.default')};
`

const TableContainer = styled.div`
  margin-top: ${fromTheme('spacing.big')};
`

const columns = [
  { title: 'Nome', key: 'name', width: '20%', type: 'text' },
  { title: 'Tipo', key: 'type', width: '15%', type: 'text' },
  { title: 'Detentor', key: 'holder', width: '15%', type: 'text' },
  { title: 'Quantidade', key: 'lastIncome.quantity', width: '10%', type: 'number' },
  {
    title: 'Valor',
    width: '40%',
    type: 'custom',
    /* eslint-disable-next-line react/display-name */
    render: element => {
      return <Form lastIncome={element.lastIncome} investmentUuid={element.uuid} />
    }
  }
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
