import React from 'react'
import styled from 'styled-components'

import requireAuth from 'app/lib/requireAuth'

import Layout from 'app/components/Layout'
import Investments from 'app/components/Investments'

const Title = styled.h2`
  margin: 50px 0;
`

const Dashboard = () => {
  return (
    <Layout title="Dashboard">
      <Title>Investimentos</Title>
      <Investments />
    </Layout>
  )
}

export default requireAuth(Dashboard)
