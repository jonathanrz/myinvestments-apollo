import React from 'react'
import { shallow } from 'enzyme'
import expect from 'expect'
import DateField from './'

describe('DateField', () => {
  it('renders date as expected', () => {
    const wrapper = shallow(<DateField date="1527341239" />)
    expect(wrapper.props()).toInclude({ field: '26/05/2018' })
  })

  it('renders empty date when date not provided', () => {
    const wrapper = shallow(<DateField />)
    expect(wrapper.props()).toInclude({ field: 'Invalid Date' })
  })

  it('renders empty date when date is null', () => {
    const wrapper = shallow(<DateField date={null} />)
    expect(wrapper.props()).toInclude({ field: 'Invalid Date' })
  })
})
