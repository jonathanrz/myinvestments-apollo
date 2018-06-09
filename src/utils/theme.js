import { get } from 'lodash'

export const fromTheme = prop => ({ theme }) => get(theme, prop)

export const fromProp = prop => props => get(props, prop)

export const branch = (prop, left, right = 'unset') => props => (get(props, prop) ? left : right)

export const ifProp = (prop, value, left, right = '') => props =>
  get(props, prop) === value ? left : right
