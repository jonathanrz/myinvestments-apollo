import React from 'react'

import requireAuth from 'app/lib/requireAuth'
import Layout from 'app/components/Layout'

import Body from './Body'

function InvestmentPage({ match }) {
  const { uuid } = match.params

  return (
    <Layout
      title="Investimento"
      menus={[
        { to: '/', label: 'Investimentos' },
        { to: `/investment/${uuid}/edit`, label: 'Editar' },
        { to: `/investment/${uuid}/add-income`, label: 'Adicionar rendimento' },
        { to: `/investment/${uuid}/import-incomes`, label: 'Importar rendimentos' }
      ]}
    >
      <Body uuid={uuid} />
    </Layout>
  )
}

export default requireAuth(InvestmentPage)
