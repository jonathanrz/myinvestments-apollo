import React from 'react'
import { format } from 'date-fns'

import FieldWithLabel from 'app/components/FieldWithLabel'

function DateField({ label = 'Data', date }) {
  return <FieldWithLabel label={label} field={format(new Date(date * 1000), 'DD/MM/YYYY')} />
}

export default DateField
