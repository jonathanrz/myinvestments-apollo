import React from 'react'
import { Form as FinalForm } from 'react-final-form'

function preventDefault(e) {
  e.preventDefault()
}

function Form({ className, style, formRef, children, ...props }) {
  return (
    <FinalForm
      {...props}
      render={formState => (
        <form
          data-test="dom-form"
          className={className}
          style={style}
          ref={formRef}
          onSubmit={formState.submitting ? preventDefault : formState.handleSubmit}
        >
          {children(formState)}
        </form>
      )}
    />
  )
}

export default Form
