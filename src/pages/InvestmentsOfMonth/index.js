import React from 'react'

import requireAuth from 'app/lib/requireAuth'
import Layout from 'app/components/Layout'

import Body from './Body'

function InvestmentOfMonthPage() {
  return (
    <Layout title="Investimentos do mês">
      <Body />
    </Layout>
  )
}

export default requireAuth(InvestmentOfMonthPage)
