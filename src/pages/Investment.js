import React from 'react'

import requireAuth from 'app/lib/requireAuth'

import Layout from 'app/components/Layout'
import Investment from 'app/components/Investment'

function InvestmentPage({ match }) {
  return (
    <Layout title="Investimento">
      <Investment uuid={match.params.uuid} />
    </Layout>
  )
}

export default requireAuth(InvestmentPage)
