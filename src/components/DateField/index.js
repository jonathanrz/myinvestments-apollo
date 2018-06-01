import React from 'react'
import { formatDate } from 'app/utils/format'

import FieldWithLabel from 'app/components/FieldWithLabel'

function DateField({ label = 'Data', date }) {
  return <FieldWithLabel label={label} field={formatDate(date)} />
}

export default DateField
