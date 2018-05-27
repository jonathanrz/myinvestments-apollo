import React from 'react'
import { formatDate } from 'app/utils/date'

import FieldWithLabel from 'app/components/FieldWithLabel'

function DateField({ label = 'Data', date }) {
  console.log('date', date)
  return <FieldWithLabel label={label} field={formatDate(date)} />
}

export default DateField
