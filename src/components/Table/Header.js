import React from 'react'
import styled from 'styled-components'

const Header = styled.thead``

const HeaderCell = styled.th``

function HeaderComponent({ columns }) {
  return (
    <Header data-test="header">
      <tr>
        {columns.map((column, index) => (
          <HeaderCell key={index} data-test="cell">
            {column.title}
          </HeaderCell>
        ))}
      </tr>
    </Header>
  )
}

export default HeaderComponent
