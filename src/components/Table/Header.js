import React from 'react'
import styled from 'styled-components'

import { cellStyle } from './Cell'

import { fromProp, fromTheme } from 'app/utils/theme'

const Header = styled.thead`
  background-color: ${fromTheme('color.darkPrimaryColors')};
  color: ${fromTheme('color.width')};
`

const HeaderCell = styled.th`
  ${cellStyle(fromProp('width'))};
`

function HeaderComponent({ columns }) {
  return (
    <Header data-test="header">
      <tr>
        {columns.map((column, index) => (
          <HeaderCell key={index} width={column.width} data-test="cell">
            {column.title}
          </HeaderCell>
        ))}
      </tr>
    </Header>
  )
}

export default HeaderComponent
