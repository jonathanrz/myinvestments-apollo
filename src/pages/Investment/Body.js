import React from 'react'
import styled from 'styled-components'
import { Query } from 'react-apollo'
import { Redirect } from 'react-router-dom'
import { orderBy } from 'lodash'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'

import { muiTheme } from 'app/theme'
import { formatDate } from 'app/utils/format'
import { fromTheme } from 'app/utils/theme'
import Loader from 'app/components/Loader'
import DateField from 'app/components/DateField'
import FieldWithLabel from 'app/components/FieldWithLabel'
import Field from 'app/components/Field'
import query from 'app/queries/Investment'

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

const styles = {
  action: {
    color: muiTheme.palette.accent.main
  },
  actions: {
    flexDirection: 'row-reverse'
  },
  card: {
    minWidth: 275,
    margin: 10
  },
  date: {
    color: muiTheme.palette.secondary.main
  },
  fields: {
    marginBottom: 16,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  field: {
    width: '16.5%'
  },
  header: {
    marginBottom: 16,
    fontSize: 14,
    display: 'flex',
    justifyContent: 'space-between'
  }
}

class Investment extends React.Component {
  state = {
    redirectTo: undefined
  }

  render() {
    const { data, incomes, classes } = this.props
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
          {incomes.map(income => (
            <Card className={classes.card} key={income.uuid}>
              <CardContent>
                <Typography className={classes.header} color="textSecondary">
                  <span className={classes.date}>{formatDate(income.date)}</span>
                  <span>{income.quantity}</span>
                </Typography>
                <div className={classes.fields}>
                  {[
                    { label: 'Valor', value: income.value },
                    { label: 'Comprado', value: income.bought },
                    { label: 'Vendido', value: income.sold },
                    { label: 'Rendimento', value: income.gross },
                    { label: 'IR', value: income.ir },
                    { label: 'Taxa', value: income.fee }
                  ].map((field, index) => (
                    <Field
                      key={index}
                      className={classes.field}
                      label={field.label}
                      value={field.value}
                    />
                  ))}
                </div>
              </CardContent>
              <CardActions className={classes.actions}>
                <Button
                  onClick={() => {
                    this.setState({ redirectTo: income.uuid })
                  }}
                  size="small"
                  variant="flat"
                  className={classes.action}
                >
                  Alterar rendimento
                </Button>
              </CardActions>
            </Card>
          ))}
        </TableContainer>
      </Page>
    )
  }
}

const StyledInvestment = withStyles(styles)(Investment)

const InvestmentQuery = ({ uuid }) => (
  <Query query={query} variables={{ uuid }} fetchPolicy="network-only">
    {({ loading, error, data }) => {
      if (loading) return <Loader message={'Buscando investimento'} />
      if (error) return error.map(error => <div key={error}>{error.message}</div>)
      return (
        <StyledInvestment
          data={data.investment}
          incomes={orderBy(data.investment.incomes, ['date'], ['desc'])}
        />
      )
    }}
  </Query>
)

export default InvestmentQuery
