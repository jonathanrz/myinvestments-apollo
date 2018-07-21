import React from 'react'
import { InputNumber } from 'antd'

import { formatCurrency } from 'app/utils/format'
import { parseCurrency } from 'app/utils/parse'

function InputCurrency(props) {
  return <InputNumber formatter={formatCurrency} parser={parseCurrency} {...props} />
}

export default InputCurrency
