import React from 'react'
import styled from 'styled-components'

import Header from './Header'
import Body from './Body'

const Table = styled.table`
  width: 100%;
`

function TableComponent({ columns, data, onRow }) {
  return (
    <Table>
      <Header columns={columns} />
      <Body columns={columns} data={data} onRow={onRow} />
    </Table>
  )
}

export default TableComponent
