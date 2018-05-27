import React from 'react'
import styled from 'styled-components'

import { fromProp } from 'app/utils/theme'

const Body = styled.tbody``

const Row = styled.tr``

const Cell = styled.td`
  width: ${fromProp('width')};
`

function BodyComponent({ columns, data }) {
  return (
    <Body data-test="body">
      {data.map((element, index) => (
        <Row key={index} data-test="row">
          {columns.map((column, rowIndex) => (
            <Cell key={`${index}-${rowIndex}`} width={column.width} data-test="cell">
              {element[column.key]}
            </Cell>
          ))}
        </Row>
      ))}
    </Body>
  )
}

export default BodyComponent
