import { format } from 'date-fns'

export function formatDate(date) {
  if (!date) return 'Invalid Date'
  return format(new Date(date * 1000), 'DD/MM/YYYY')
}
