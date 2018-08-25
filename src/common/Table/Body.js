import React from 'react'
import styled from 'styled-components'
import { get } from 'lodash'

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
                  currency: formatCurrency(get(element, column.key)),
                  custom: column.render && column.render(element),
                  date: formatDate(get(element, column.key)),
                  number: formatNumber(get(element, column.key)),
                  text: get(element, column.key)
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
