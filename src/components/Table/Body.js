import React from 'react'
import styled from 'styled-components'

const Body = styled.tbody``

const Row = styled.tr``

const Cell = styled.td``

function BodyComponent({ columns, data }) {
  return (
    <Body data-test="body">
      {data.map((element, index) => (
        <Row key={index} data-test="row">
          {columns.map((column, rowIndex) => (
            <Cell key={`${index}-${rowIndex}`} data-test="cell">
              {element[column.key]}
            </Cell>
          ))}
        </Row>
      ))}
    </Body>
  )
}

export default BodyComponent
