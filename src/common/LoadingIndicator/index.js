import React, { Component, createContext } from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import ComponentLifecycle from 'app/common/ComponentLifecycle'

const { Provider, Consumer } = createContext({ loading: false })

class LoadingIndicatorProvider extends Component {
  state = {
    loading: false,
    count: 0
  }

  increment(amount) {
    /*
     * React's setState is async, so we
     * can't use the setState(nextState)
     * syntax, we have to schedule the
     * change to make sure that the counter
     * will be incremented or decremented
     * based on the most recent state
     *
     * https://reactjs.org/docs/state-and-lifecycle.html#state-updates-may-be-asynchronous
     */
    this.setState(({ count: prevCount }) => {
      const count = prevCount + amount

      return {
        count,
        loading: count > 0
      }
    })
  }

  register = () => {
    this.increment(1)
  }

  unregister = () => {
    this.increment(-1)
  }

  render() {
    return (
      <Provider
        value={{
          loading: this.state.loading,
          register: this.register,
          unregister: this.unregister
        }}
      >
        {this.props.children}
      </Provider>
    )
  }
}

function LoadingIndicator(props) {
  return <Consumer>{({ loading }) => (loading ? <CircularProgress {...props} /> : null)}</Consumer>
}

function ShowLoadingIndicator() {
  return (
    <Consumer>
      {({ register, unregister }) => (
        <ComponentLifecycle componentDidMount={register} componentWillUnmount={unregister} />
      )}
    </Consumer>
  )
}

export { LoadingIndicatorProvider, LoadingIndicator, ShowLoadingIndicator }
