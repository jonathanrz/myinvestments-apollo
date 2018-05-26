import { get } from 'lodash'

export const fromTheme = prop => ({ theme }) => get(theme, prop)

export const fromProp = prop => props => get(props, prop)

export const ifProp = (prop, value, left, right = '') => props =>
  get(props, prop) === value ? left : right
