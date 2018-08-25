import React, { createContext, Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import MUISnackbar from '@material-ui/core/Snackbar'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import ComponentLifecycle from 'app/common/ComponentLifecycle'

const { Provider, Consumer } = createContext()

const styles = theme => ({
  close: {
    width: theme.spacing.unit * 4,
    height: theme.spacing.unit * 4
  }
})

class SnackbarProvider extends Component {
  state = {
    open: false,
    messageInfo: null
  }

  queue = []

  enqueue = message => {
    this.queue.push({
      message,
      key: new Date().getTime()
    })

    if (this.state.open) {
      // immediately begin dismissing current message
      // to start showing new one
      this.setState({ open: false })
    } else {
      this.processQueue()
    }
  }

  processQueue = () => {
    if (this.queue.length > 0) {
      this.setState({
        messageInfo: this.queue.shift(),
        open: true
      })
    }
  }

  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }

    this.setState({ open: false })
  }

  handleExited = () => {
    this.processQueue()
  }

  render() {
    const { classes, children } = this.props
    const { messageInfo } = this.state

    return (
      <Provider value={{ enqueue: this.enqueue }}>
        {messageInfo && (
          <MUISnackbar
            key={messageInfo.key}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center'
            }}
            open={this.state.open}
            autoHideDuration={6000}
            onClose={this.handleClose}
            onExited={this.handleExited}
            message={messageInfo.message}
            action={
              <IconButton color="inherit" className={classes.close} onClick={this.handleClose}>
                <CloseIcon />
              </IconButton>
            }
          />
        )}
        {children}
      </Provider>
    )
  }
}

const EnhancedSnackbarProvider = withStyles(styles)(SnackbarProvider)

function Snackbar({ message }) {
  return (
    <Consumer>
      {({ enqueue }) => <ComponentLifecycle componentDidMount={() => enqueue(message)} />}
    </Consumer>
  )
}

export { EnhancedSnackbarProvider as SnackbarProvider }
export default Snackbar
