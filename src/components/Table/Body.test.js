import React from 'react'
import { shallow } from 'enzyme'

import {
  findDataTest,
  expectToHaveLength,
  expectToHaveText,
  expectToHaveProp
} from 'app/utils/tests'

import Body from './Body'

function validateRow(row, columns, element) {
  const cells = findDataTest(row, 'cell')
  expectToHaveLength(cells, columns.length)
  columns.forEach((column, index) => {
    expectToHaveText(cells.at(index), element[column.key])
    expectToHaveProp(cells.at(index), { width: column.width })
  })
}

function renderAndValidateCell(columns, data, expectedValue) {
  const wrapper = shallow(<Body columns={columns} data={data} />)
  const rows = findDataTest(wrapper, 'row')
  expectToHaveLength(rows, data.length)
  expectToHaveText(findDataTest(rows.at(0), 'cell').at(0), expectedValue)
}

describe('TableBody', () => {
  it('renders body as expected', () => {
    const columns = [
      { key: 'element1', width: '75%', type: 'text' },
      { key: 'element2', width: '25%', type: 'text' }
    ]
    const data = [
      { element1: 'element11', element2: 'element12' },
      { element1: 'element21', element2: 'element22' }
    ]
    const wrapper = shallow(<Body columns={columns} data={data} />)
    const rows = findDataTest(wrapper, 'row')
    expectToHaveLength(rows, data.length)
    validateRow(rows.at(0), columns, data[0])
    validateRow(rows.at(1), columns, data[1])
  })

  it('renders date cell', () => {
    const columns = [{ key: 'date', width: '100%', type: 'date' }]
    renderAndValidateCell(columns, [{ date: 1527460426 }], '27/05/2018')
  })

  it('renders invalid date cell', () => {
    const columns = [{ key: 'date', width: '100%', type: 'date' }]
    renderAndValidateCell(columns, [{ date: null }], 'Invalid Date')
  })

  it('renders currency cell', () => {
    const columns = [{ key: 'value', width: '100%', type: 'currency' }]
    renderAndValidateCell(columns, [{ value: 1234.56 }], '$1,234.56')
  })

  it('renders currency cell rounded', () => {
    const columns = [{ key: 'value', width: '100%', type: 'currency' }]
    renderAndValidateCell(columns, [{ value: 0.129 }], '$0.13')
  })

  it('renders int currency cell', () => {
    const columns = [{ key: 'value', width: '100%', type: 'currency' }]
    renderAndValidateCell(columns, [{ value: 1234 }], '$1,234.00')
  })

  it('renders invalid currency cell', () => {
    const columns = [{ key: 'value', width: '100%', type: 'currency' }]
    renderAndValidateCell(columns, [{ value: null }], 'Invalid Currency')
  })

  it('renders number cell', () => {
    const columns = [{ key: 'value', width: '100%', type: 'number' }]
    renderAndValidateCell(columns, [{ value: 1 }], '1')
  })

  it('renders big number cell', () => {
    const columns = [{ key: 'value', width: '100%', type: 'number' }]
    renderAndValidateCell(columns, [{ value: 123456789 }], '123,456,789')
  })

  it('renders number with three decimal rounded cell', () => {
    const columns = [{ key: 'value', width: '100%', type: 'number' }]
    renderAndValidateCell(columns, [{ value: 1234.5679 }], '1,234.568')
  })

  it('renders invalid number cell', () => {
    const columns = [{ key: 'value', width: '100%', type: 'number' }]
    renderAndValidateCell(columns, [{ value: null }], 'Invalid Value')
  })
})
