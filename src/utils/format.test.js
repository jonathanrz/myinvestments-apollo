import expect from 'expect'
import { formatCurrency } from './format'

describe('FormatCurrency', () => {
  it('format int value as currency', () => {
    expect(formatCurrency(100)).toBe('$1.00')
  })

  it('format float value as currency', () => {
    expect(formatCurrency(123.45)).toBe('$123.45')
  })
})
