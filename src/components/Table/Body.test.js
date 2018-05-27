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

describe('TableBody', () => {
  it('renders body as expected', () => {
    const columns = [{ key: 'element1', width: '75%' }, { key: 'element2', width: '25%' }]
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
    const data = [{ date: 1527460426 }]
    const wrapper = shallow(<Body columns={columns} data={data} />)
    const rows = findDataTest(wrapper, 'row')
    expectToHaveLength(rows, data.length)
    expectToHaveText(findDataTest(rows.at(0), 'cell').at(0), '27/05/2018')
  })
})
