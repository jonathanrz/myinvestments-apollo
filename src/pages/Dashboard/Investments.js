import React, { Fragment } from 'react'
import { Query } from 'react-apollo'
import { Redirect } from 'react-router-dom'
import { withStyles, withTheme } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'

import { formatDate } from 'app/utils/format'
import Loader from 'app/components/Loader'
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
            <CardActions>
              <Button
                onClick={() => {
                  this.setState({ redirectTo: investment.uuid })
                }}
                size="small"
                color="primary"
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
