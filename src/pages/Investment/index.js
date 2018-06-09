import React from 'react'

import requireAuth from 'app/lib/requireAuth'
import Layout from 'app/components/Layout'

import Body from './Body'

function InvestmentPage({ match }) {
  return (
    <Layout title="Investimento">
      <Body uuid={match.params.uuid} />
    </Layout>
  )
}

export default requireAuth(InvestmentPage)
