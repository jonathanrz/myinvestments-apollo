import expect from 'expect'
import { parseCurrency } from './parse'

describe('ParseCurrency', () => {
  it('format currency value as int', () => {
    expect(parseCurrency('$100.00')).toBe(100)
  })

  it('format currency with cents as float', () => {
    expect(parseCurrency('$123.45')).toBe(123.45)
  })
})
