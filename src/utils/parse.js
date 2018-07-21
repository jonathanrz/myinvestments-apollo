import moment from 'moment'

export function parseDate(date) {
  if (date === undefined || date == null) return null
  return moment(date, 'DD/MM/YYYY')
}

export function parseCurrency(value) {
  if (value === undefined || value == null) return null
  return parseFloat(value.replace(/\$\s?|(,*)/g, ''))
}
