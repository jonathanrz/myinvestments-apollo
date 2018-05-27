import React from 'react'
import styled from 'styled-components'

import { fromProp } from 'app/utils/theme'

const Header = styled.thead``

const HeaderCell = styled.th`
  width: ${fromProp('width')};
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
