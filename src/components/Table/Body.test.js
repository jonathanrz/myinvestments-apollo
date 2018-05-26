import React from 'react'
import { shallow } from 'enzyme'

import { findDataTest, expectToHaveLength, expectToHaveText } from 'app/utils/tests'

import Body from './Body'

function validateRow(row, columns, element) {
  const cells = findDataTest(row, 'cell')
  expectToHaveLength(cells, columns.length)
  columns.forEach((column, index) => {
    expectToHaveText(cells.at(index), element[column.key])
    expectToHaveText(cells.at(index), element[column.key])
  })
}

describe('TableBody', () => {
  it('renders body as expected', () => {
    const columns = [{ key: 'element1' }, { key: 'element2' }]
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
})
