import React, { Fragment } from 'react'
import { Mutation as ApolloMutation } from 'react-apollo'
import { ShowLoadingIndicator } from 'app/common/LoadingIndicator'

function Mutation({ children, ...props }) {
  return (
    <ApolloMutation {...props}>
      {(mutate, state) => (
        <Fragment>
          {state.loading && <ShowLoadingIndicator />}
          {children(mutate, state)}
        </Fragment>
      )}
    </ApolloMutation>
  )
}

export default Mutation
