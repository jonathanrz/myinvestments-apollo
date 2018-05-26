import React from 'react'
import { shallow } from 'enzyme'

import { findDataTest, expectToHaveLength, expectToHaveText } from 'app/utils/tests'

import Header from './Header'

describe('TableHeader', () => {
  it('renders headers as expected', () => {
    const columns = [{ name: 'row1' }, { name: 'row2' }]
    const wrapper = shallow(<Header columns={columns} />)
    const cells = findDataTest(wrapper, 'cell')
    expectToHaveLength(cells, columns.length)
    expectToHaveText(cells.at(0), 'row1')
    expectToHaveText(cells.at(1), 'row2')
  })
})
