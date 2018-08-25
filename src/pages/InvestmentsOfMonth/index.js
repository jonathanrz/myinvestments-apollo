import React from 'react'

import requireAuth from 'app/lib/requireAuth'
import AppBar from 'app/common/AppBar'

import Body from './Body'

function InvestmentOfMonthPage() {
  return (
    <AppBar title="Investimentos do mês">
      <Body />
    </AppBar>
  )
}

export default requireAuth(InvestmentOfMonthPage)
