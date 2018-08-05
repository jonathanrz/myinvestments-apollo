import React from 'react'

import requireAuth from 'app/lib/requireAuth'
import Layout from 'app/components/Layout'

function InvestmentOfMonthPage() {
  return <Layout title="Investimentos do mês" />
}

export default requireAuth(InvestmentOfMonthPage)
