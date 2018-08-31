import React from 'react'
import expect, { createSpy } from 'expect'
import { shallow } from 'enzyme'
import { findDataTest, expectDataTestToHaveProps } from 'app/utils/tests'
import FormPage from './index'

describe('FormPage', () => {
  function build(props) {
    return shallow(
      <FormPage
        {...{
          title: 'SOME TITLE',
          mutation: 'SOME MUTATION',
          children: 'SOME CHILDREN',
          initialValues: 'SOME INITIALVALUES',
          returnHref: data => `SOME RETURNHREF ${data.id}`,
          parseVariables: 'SOME PARSEVARIABLES',
          successMessage: 'SOME SUCCESSMESSAGE',
          errorMessage: 'SOME ERRORMESSAGE',
          buttons: null,
          ...(props || {})
        }}
      />
    ).dive()
  }

  function buildMutationChild(props, mutate = () => null, response = { data: {} }) {
    const buildProps = build(props).props()
    return shallow(<div>{buildProps['children'](mutate, response)}</div>)
  }

  function buildFormChild(props, mutate = () => null, formState = {}, response) {
    const form = findDataTest(buildMutationChild(props, mutate, response), 'form')
    return shallow(<div>{form.props()['children'](formState)}</div>)
  }

  it('passes the right props to the Mutation component', () => {
    const wrapper = build()

    expectDataTestToHaveProps(wrapper, 'mutation', {
      redirectOnError: false,
      mutation: 'SOME MUTATION'
    })
  })

  it('passes the initial values to the Form component', () => {
    const wrapper = buildMutationChild()

    expectDataTestToHaveProps(wrapper, 'form', { initialValues: 'SOME INITIALVALUES' })
  })

  describe('onSubmit handler', () => {
    it('calls the mutation with the parsed variables', () => {
      const mutate = createSpy(() => Promise.resolve()).andCallThrough()

      const wrapper = buildMutationChild(
        {
          parseVariables: values => values.toUpperCase()
        },
        mutate
      )

      const form = findDataTest(wrapper, 'form')

      form.props()['onSubmit']('some value')

      expect(mutate).toHaveBeenCalledWith({ variables: 'SOME VALUE' })
    })

    it('returns null if the mutation is resolved', async () => {
      const wrapper = buildMutationChild({ parseVariables: v => v }, () => Promise.resolve())

      const form = findDataTest(wrapper, 'form')

      expect(await form.prop('onSubmit')()).toBe(null)
    })

    it('returns the reason if the mutation is reject', async () => {
      const error = new Error('some reason')
      const wrapper = buildMutationChild({ parseVariables: v => v }, () => Promise.reject(error))

      const form = findDataTest(wrapper, 'form')

      expect(await form.prop('onSubmit')()).toBe(error)
    })
  })
})
