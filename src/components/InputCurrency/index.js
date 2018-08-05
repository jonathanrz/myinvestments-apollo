import React, { Component } from 'react'
import { Input } from 'antd'

class InputCurrency extends Component {
  render() {
    const { props } = this
    return <Input addonBefore="R$" {...props} />
  }
}

export default InputCurrency
