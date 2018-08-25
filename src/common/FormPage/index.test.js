import React from 'react'
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
    return shallow(<div>{build(props).prop('children')(mutate, response)}</div>)
  }

  function buildFormChild(props, mutate = () => null, formState = {}, response) {
    const form = findDataTest(buildMutationChild(props, mutate, response), 'form')
    return shallow(<div>{form.prop('children')(formState)}</div>)
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
      const mutate = jest.fn(() => Promise.resolve())

      const wrapper = buildMutationChild(
        {
          parseVariables: values => values.toUpperCase()
        },
        mutate
      )

      const form = findDataTest(wrapper, 'form')

      form.prop('onSubmit')('some value')

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

  describe('render prop', () => {
    it('shows a snackbar and redirects on success', () => {
      const response = {
        data: { id: 42 }
      }

      const wrapper = buildFormChild(null, null, { submitSucceeded: true }, response)

      expectDataTestToHaveProps(wrapper, 'success-message', { message: 'SOME SUCCESSMESSAGE' })
      expectDataTestToHaveProps(wrapper, 'redirect', { to: `SOME RETURNHREF ${response.data.id}` })
    })

    it('shows a snackbar on error', () => {
      const wrapper = buildFormChild(null, null, {
        submitting: false,
        submitErrors: 'some error'
      })

      expectDataTestToHaveProps(wrapper, 'error-message', { message: 'SOME ERRORMESSAGE' })
    })

    it('accepts a function as error message', () => {
      const errorMessage = jest.fn(() => 'SOME CUSTOM ERROR MESSAGE')

      const wrapper = buildFormChild(
        {
          errorMessage
        },
        null,
        {
          submitting: false,
          submitErrors: 'some error'
        }
      )

      expect(errorMessage).toHaveBeenCalledWith('some error')

      expectDataTestToHaveProps(wrapper, 'error-message', { message: 'SOME CUSTOM ERROR MESSAGE' })
    })

    it('renders the page header with the right title', () => {
      const wrapper = buildFormChild()
      expectDataTestToHaveProps(wrapper, 'page-header', { title: 'SOME TITLE' })
    })

    describe('renders the page header buttons', () => {
      function runTest(submitting) {
        const Button = () => null

        const someButtons = [
          <Button key="1" someProp="someProp" />,
          <Button key="2" someProp="someProp" />
        ]

        const wrapper = buildFormChild({ buttons: someButtons }, null, {
          submitting
        })

        const renderedButtons = findDataTest(wrapper, 'page-header').prop('buttons')

        someButtons.forEach((button, index) => {
          expect(renderedButtons[index].type).toBe(Button)
          expect(renderedButtons[index].props).toEqual({
            someProp: 'someProp',
            disabled: submitting
          })
        })
      }

      it('enabled if the form is not submitting', () => {
        runTest(false)
      })

      it('disabled if the form is submitting', () => {
        runTest(true)
      })
    })
  })
})
