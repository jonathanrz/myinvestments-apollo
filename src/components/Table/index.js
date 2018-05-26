import React from 'react'
import styled from 'styled-components'

import Header from './Header'

const Table = styled.table``

const Body = styled.tbody``

const Row = styled.tr``

const Cell = styled.td``

function TableComponent({ columns, data }) {
  return (
    <Table>
      <Header columns={columns} />
      <Body>
        {data.map((element, index) => (
          <Row key={index}>
            {columns.map((column, rowIndex) => (
              <Cell key={`${index}-${rowIndex}`}>{element[column.propery]}</Cell>
            ))}
          </Row>
        ))}
      </Body>
    </Table>
  )
}

export default TableComponent
