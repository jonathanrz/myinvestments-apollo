import React from 'react'
import expect, { createSpy } from 'expect'
import { noop } from 'lodash/fp'
import { shallow, mount } from 'enzyme'
import { Form as FinalForm } from 'react-final-form'
import { findDataTest, expectToHaveProp, expectToNotHaveProp } from 'app/utils/tests'
import Form from './index'

describe('Form', () => {
  it('renders a react-final-form Form with the right props', () => {
    const wrapper = shallow(
      <Form
        className="SOME CLASSNAME"
        style="SOME STYLE"
        formRef="SOME FORMREF"
        prop1="SOME PROP1"
        prop2="SOME PROP2"
      >
        SOME CHILDREN
      </Form>
    )

    expect(wrapper.type()).toBe(FinalForm)
    expectToNotHaveProp(wrapper, 'className')
    expectToNotHaveProp(wrapper, 'style')
    expectToNotHaveProp(wrapper, 'formRef')
    expectToNotHaveProp(wrapper, 'children')
    expectToHaveProp(wrapper, { prop1: 'SOME PROP1' })
    expectToHaveProp(wrapper, { prop2: 'SOME PROP2' })
    expectToHaveProp(wrapper, 'render')
  })

  it('renders a dom form with the right props', () => {
    const children = () => 'SOME CHILD'
    const style = {}
    const wrapper = shallow(
      <Form className="SOME CLASSNAME" style={style} prop1="SOME PROP1" prop2="SOME PROP2">
        {children}
      </Form>
    )

    const formWrapper = shallow(wrapper.prop('render')({}))

    expect(formWrapper.type()).toBe('form')
    expectToHaveProp(formWrapper, { className: 'SOME CLASSNAME' })
    expectToHaveProp(formWrapper, { style })
    expectToHaveProp(formWrapper, { children: 'SOME CHILD' })
    expectToNotHaveProp(formWrapper, 'prop1')
    expectToNotHaveProp(formWrapper, 'prop2')
  })

  it('exposes the dom form ref through the formRef prop', () => {
    let formRef
    const wrapper = mount(
      <Form
        onSubmit={noop}
        formRef={ref => {
          formRef = ref
        }}
      >
        {noop}
      </Form>
    )

    const domFormNode = findDataTest(wrapper, 'dom-form').getDOMNode()

    expect(formRef).toBe(domFormNode)
  })

  it("calls the onSubmit callback if the form isn't already being submitted", () => {
    const onSubmit = createSpy()
    const wrapper = shallow(<Form onSubmit={onSubmit}>{noop}</Form>)

    const formWrapper = shallow(
      wrapper.prop('render')({
        submitting: false,
        handleSubmit: event => {
          wrapper.prop('onSubmit')(event)
        }
      })
    )

    formWrapper.simulate('submit', 'some event')

    expect(onSubmit).toHaveBeenCalledWith('some event')
  })

  it('prevents submission if the form is already being submitted', () => {
    const onSubmit = createSpy()
    const preventDefault = createSpy()
    const wrapper = shallow(<Form onSubmit={onSubmit}>{noop}</Form>)

    const formWrapper = shallow(
      wrapper.prop('render')({
        submitting: true,
        handleSubmit: event => {
          wrapper.prop('onSubmit')(event)
        }
      })
    )

    formWrapper.simulate('submit', { preventDefault })

    expect(onSubmit).toNotHaveBeenCalled()
    expect(preventDefault).toHaveBeenCalled()
  })

  it('calls the render prop with the current form state', () => {
    const formState = { someState: Math.random() }
    const children = createSpy(() => null)
    const wrapper = shallow(<Form>{children}</Form>)

    shallow(wrapper.prop('render')(formState))

    expect(children).toHaveBeenCalledWith(formState)
  })
})
