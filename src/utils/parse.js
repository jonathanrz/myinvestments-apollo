export function parseCurrency(value) {
  if (value === undefined || value == null) return null
  return parseFloat(value.replace(/\$\s?|(,*)/g, ''))
}
