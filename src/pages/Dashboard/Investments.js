import React, { Fragment } from 'react'
import { Query } from 'react-apollo'
import { Redirect } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'

import { muiTheme } from 'app/theme'
import { formatDate } from 'app/utils/format'
import Loader from 'app/common/Loader'
import query from 'app/queries/Investments'

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
  dueDate: {
    color: muiTheme.palette.secondary.main
  },
  header: {
    marginBottom: 16,
    fontSize: 14,
    display: 'flex',
    justifyContent: 'space-between'
  }
}

class Investments extends React.Component {
  state = {
    redirectTo: undefined
  }

  render() {
    const { data, classes } = this.props
    const { redirectTo } = this.state

    return redirectTo ? (
      <Redirect to={{ pathname: `/investment/${redirectTo}`, state: { uuid: redirectTo } }} push />
    ) : (
      <Fragment>
        {data.map(investment => (
          <Card className={classes.card} key={investment.uuid}>
            <CardContent>
              <Typography className={classes.header} color="textSecondary">
                <span>{investment.type}</span>
                <span>{investment.holder}</span>
                <span>{investment.objective}</span>
                {investment.dueDate && (
                  <span className={classes.dueDate}>{formatDate(investment.dueDate)}</span>
                )}
              </Typography>
              <Typography variant="headline" component="h2">
                {investment.name}
              </Typography>
            </CardContent>
            <CardActions className={classes.actions}>
              <Button
                onClick={() => {
                  this.setState({ redirectTo: investment.uuid })
                }}
                size="small"
                className={classes.action}
              >
                Ver investimento
              </Button>
            </CardActions>
          </Card>
        ))}
      </Fragment>
    )
  }
}

const StyledInvestments = withStyles(styles)(Investments)

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
