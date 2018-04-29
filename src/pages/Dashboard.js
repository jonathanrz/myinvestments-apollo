import React from 'react'

import requireAuth from 'app/lib/requireAuth'

import Layout from 'app/components/Layout'
import Investments from 'app/components/Investments'

const Dashboard = () => {
  return (
    <Layout title="Dashboard">
      <Investments />
    </Layout>
  )
}

export default requireAuth(Dashboard)
