import { invoke } from 'lodash/fp'
import { Component } from 'react'

class ComponentLifecycle extends Component {
  componentDidMount() {
    invoke('componentDidMount', this.props)
  }

  componentWillUnmount() {
    invoke('componentWillUnmount', this.props)
  }

  componentDidUpdate() {
    invoke('componentDidUpdate', this.props)
  }

  render() {
    return this.props.children || null
  }
}

export default ComponentLifecycle
