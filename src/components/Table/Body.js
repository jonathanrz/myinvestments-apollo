import React from 'react'
import styled from 'styled-components'

import { formatDate, formatCurrency } from 'app/utils/format'
import { fromProp } from 'app/utils/theme'

import { cellStyle } from './Cell'

const Body = styled.tbody``

const Row = styled.tr``

const Cell = styled.td`
  ${cellStyle(fromProp('width'))};
`

function BodyComponent({ columns, data }) {
  return (
    <Body data-test="body">
      {data.map((element, index) => (
        <Row key={index} data-test="row">
          {columns.map((column, rowIndex) => (
            <Cell key={`${index}-${rowIndex}`} width={column.width} data-test="cell">
              {
                {
                  date: formatDate(element[column.key]),
                  currency: formatCurrency(element[column.key]),
                  text: element[column.key]
                }[column.type]
              }
            </Cell>
          ))}
        </Row>
      ))}
    </Body>
  )
}

export default BodyComponent
