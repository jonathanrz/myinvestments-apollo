import React from 'react'
import styled from 'styled-components'

import requireAuth from 'app/lib/requireAuth'
import AppBar from 'app/components/AppBar'

import Investments from './Investments'

const Title = styled.h2`
  margin: 50px 0;
`

const Dashboard = () => {
  return (
    <AppBar title="Dashboard" menus={[{ to: '/new-investment', label: 'Novo Investimento' }]}>
      <Title>Investimentos</Title>
      <Investments />
    </AppBar>
  )
}

export default requireAuth(Dashboard)
