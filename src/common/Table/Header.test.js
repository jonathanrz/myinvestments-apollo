import React from 'react'
import { shallow } from 'enzyme'

import {
  findDataTest,
  expectToHaveLength,
  expectToHaveText,
  expectToHaveProp
} from 'app/utils/tests'

import Header from './Header'

describe('TableHeader', () => {
  it('renders headers as expected', () => {
    const columns = [{ title: 'row1', width: '75%' }, { title: 'row2', width: '25%' }]
    const wrapper = shallow(<Header columns={columns} />)
    const cells = findDataTest(wrapper, 'cell')
    expectToHaveLength(cells, columns.length)
    expectToHaveText(cells.at(0), 'row1')
    expectToHaveProp(cells.at(0), { width: '75%' })
    expectToHaveText(cells.at(1), 'row2')
    expectToHaveProp(cells.at(1), { width: '25%' })
  })
})
