import React from 'react'
import styled from 'styled-components'

import Label from 'app/common/Label'

const Container = styled.div`
  display: flex;
  flex-direction: column;
`

const Field = styled.div`
  font-size: 20px;
  height: 20px;
  line-height: 20px;
`

function FieldWithLabel({ label, field }) {
  return (
    <Container>
      <Label>{label}</Label>
      <Field>{field}</Field>
    </Container>
  )
}

export default FieldWithLabel
