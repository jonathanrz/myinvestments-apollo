import React from 'react'
import styled from 'styled-components'

import { formatDate, formatCurrency, formatNumber } from 'app/utils/format'
import { fromProp, branch } from 'app/utils/theme'

import { cellStyle } from './Cell'

const Body = styled.tbody``

const Row = styled.tr`
  cursor: ${branch('handleClick', 'pointer', 'auto')};
`

const Cell = styled.td`
  ${cellStyle(fromProp('width'))};
`

function BodyComponent({ columns, data, onRow }) {
  return (
    <Body data-test="body">
      {data.map((element, index) => (
        <Row
          key={index}
          data-test="row"
          handleClick={onRow !== undefined}
          onClick={() => {
            onRow && onRow(element)
          }}
        >
          {columns.map((column, rowIndex) => (
            <Cell key={`${index}-${rowIndex}`} width={column.width} data-test="cell">
              {
                {
                  currency: formatCurrency(element[column.key]),
                  date: formatDate(element[column.key]),
                  number: formatNumber(element[column.key]),
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
