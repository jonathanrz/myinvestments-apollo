import React from 'react'
import styled from 'styled-components'

import { muiTheme } from 'app/theme'

const Label = styled.div`
  color: ${muiTheme.palette.primary.main};
  font-size: 12px;
`

const TextPrimary = styled.div`
  color: ${muiTheme.palette.primary.text};
  font-size: 16px;
  font-weight: 500;
`

const TextSecondary = styled.div`
  color: ${muiTheme.palette.secondary.text};
  font-size: 15px;
  font-weight: 400;
`

function Field({ label, value, className, primary = true }) {
  return (
    <div className={className}>
      <Label>{label}</Label>
      {primary ? <TextPrimary>{value}</TextPrimary> : <TextSecondary>{value}</TextSecondary>}
    </div>
  )
}

export default Field
