import React, { Component } from 'react'
import { InputNumber } from 'antd'

import { formatCurrency } from 'app/utils/format'
import { parseCurrency } from 'app/utils/parse'

class InputCurrency extends Component {
  render() {
    const { props } = this
    return <InputNumber formatter={formatCurrency} parser={parseCurrency} {...props} />
  }
}

export default InputCurrency
