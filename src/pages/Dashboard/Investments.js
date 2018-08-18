import React, { Fragment } from 'react'
import { Query } from 'react-apollo'
import { Redirect } from 'react-router-dom'
import { withStyles, withTheme } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'

import { formatDate } from 'app/utils/format'
import Loader from 'app/components/Loader'
import Table from 'app/components/Table'
import query from 'app/queries/Investments'

const styles = {
  card: {
    minWidth: 275,
    margin: 10
  },
  header: {
    marginBottom: 16,
    fontSize: 14,
    display: 'flex',
    justifyContent: 'space-between'
  }
}

const columns = [
  { title: 'Nome', key: 'name', width: '20%', type: 'text' },
  { title: 'Tipo', key: 'type', width: '20%', type: 'text' },
  { title: 'Detentor', key: 'holder', width: '20%', type: 'text' },
  { title: 'Objetivo', key: 'objective', width: '20%', type: 'text' },
  { title: 'Data Vencimento', key: 'dueDate', width: '20%', type: 'date' }
]

class Investments extends React.Component {
  state = {
    redirectTo: undefined
  }

  render() {
    const { data, classes, theme } = this.props
    const { redirectTo } = this.state

    return redirectTo ? (
      <Redirect to={{ pathname: `/investment/${redirectTo}`, state: { uuid: redirectTo } }} push />
    ) : (
      <Fragment>
        <Table
          data={data}
          columns={columns}
          onRow={record => this.setState({ redirectTo: record.uuid })}
        />

        {data.map(investment => (
          <Card className={classes.card} key={investment.uuid}>
            <CardContent>
              <Typography className={classes.header} color="textSecondary">
                <span>{investment.type}</span>
                <span>{investment.holder}</span>
                <span>{investment.objective}</span>
                {investment.dueDate && (
                  <span style={{ color: theme.palette.secondary.main }}>
                    {formatDate(investment.dueDate)}
                  </span>
                )}
              </Typography>
              <Typography variant="headline" component="h2">
                {investment.name}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Fragment>
    )
  }
}

const StyledInvestments = withStyles(styles)(withTheme()(Investments))

const InvestmentsQuery = () => (
  <Query query={query}>
    {({ loading, error, data }) => {
      if (loading) return <Loader message={'Buscando investimentos'} />
      if (error) return error.map(error => <div key={error}>{error.message}</div>)
      return <StyledInvestments data={data.investments} />
    }}
  </Query>
)

export default InvestmentsQuery
