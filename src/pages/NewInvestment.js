import React from 'react'

import requireAuth from 'app/lib/requireAuth'

import Layout from 'app/components/Layout'

function NewInvestmentPage() {
  return <Layout title="Novo Investimento" />
}

export default requireAuth(NewInvestmentPage)
