import React, { Fragment } from 'react'
import { Redirect } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import AppBar from 'app/common/AppBar'
import Mutation from 'app/common/Mutation'
import Snackbar from 'app/common/Snackbar'
import Form from 'app/common/Form'

const styles = theme => ({
  panel: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16
  })
})

function FormPage({
  classes,
  title,
  mutation,
  children,
  initialValues,
  returnHref,
  parseVariables,
  successMessage,
  errorMessage,
  paperWrapper,
  buttons
}) {
  return (
    <Mutation redirectOnError={false} mutation={mutation} data-test="mutation">
      {(mutate, { data } = {}) => (
        <AppBar title={title}>
          <Form
            data-test="form"
            initialValues={initialValues}
            onSubmit={values =>
              mutate({
                variables: parseVariables(values)
              })
                .then(() => null)
                .catch(error => error)
            }
          >
            {({ submitting, submitErrors, submitSucceeded }) =>
              submitSucceeded ? (
                <Fragment>
                  <Snackbar message={successMessage} />
                  <Redirect data-test="redirect" push to={returnHref(data)} />
                </Fragment>
              ) : (
                <Fragment>
                  {!submitting &&
                    submitErrors && (
                      <Snackbar
                        data-test="error-message"
                        message={
                          typeof errorMessage === 'function'
                            ? errorMessage(submitErrors)
                            : errorMessage
                        }
                      />
                    )}
                </Fragment>
              )
            }
          </Form>
        </AppBar>
      )}
    </Mutation>
  )
}

export default withStyles(styles)(FormPage)
