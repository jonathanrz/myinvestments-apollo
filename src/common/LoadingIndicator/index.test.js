import React from 'react'
import { shallow } from 'enzyme'
import expect from 'expect'
import CircularProgress from '@material-ui/core/CircularProgress'
import ComponentLifecycle from 'app/common/ComponentLifecycle'
import { LoadingIndicatorProvider, LoadingIndicator, ShowLoadingIndicator } from './index'

function renderConsumer(Consumer, state) {
  return shallow(<div>{shallow(<Consumer />).prop('children')(state)}</div>)
}

describe('LoadingIndicatorProvider', () => {
  function build() {
    return shallow(<LoadingIndicatorProvider>SOME CHILDREN</LoadingIndicatorProvider>)
  }

  it('register method increments the counter and set loading to true', () => {
    const wrapper = build()

    for (let i = 0; i < 5; i++) {
      expect(wrapper.state()).toEqual({ count: i, loading: i > 0 })
      wrapper.instance().register()
    }
  })

  it('unregister method decrements the counter and set loading to false when counter reaches zero', () => {
    const wrapper = build()
    wrapper.setState({ count: 5 })

    for (let i = 5; i < 0; i--) {
      expect(wrapper).toHaveState({ count: i, loading: i > 0 })
      wrapper.instance().unregister()
    }
  })

  it('passes the right props to the context provider', () => {
    const wrapper = build()

    wrapper.setState({ loading: 'SOME LOADING' })

    expect(wrapper.props()).toEqual({
      value: {
        loading: 'SOME LOADING',
        register: wrapper.instance().register,
        unregister: wrapper.instance().unregister
      },
      children: 'SOME CHILDREN'
    })
  })
})

describe('LoadingIndicator', () => {
  it('renders nothing if the provider is not loading', () => {
    const wrapper = renderConsumer(LoadingIndicator, { loading: false })
    console.log({ props: wrapper.children() })
    expect(wrapper.children().length).toEqual(0)
  })

  it('renders a CircularProgress if the provider is loading', () => {
    const wrapper = renderConsumer(LoadingIndicator, { loading: true })

    expect(wrapper.find(CircularProgress)).toExist()
  })
})

describe('ShowLoadingIndicator', () => {
  it('passes the register and unregister methods to ComponentLifecycle', () => {
    const wrapper = renderConsumer(ShowLoadingIndicator, {
      register: 'SOME REGISTER',
      unregister: 'SOME UNREGISTER'
    })

    expect(wrapper.find(ComponentLifecycle)).toHaveProp({
      componentDidMount: 'SOME REGISTER',
      componentWillUnmount: 'SOME UNREGISTER'
    })
  })
})
