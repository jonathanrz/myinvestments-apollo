import gql from 'graphql-tag'

export default gql`
  mutation UpdateInvestment($uuid: String!, $data: InvestmentInput!) {
    updateInvestment(uuid: $uuid, data: $data) {
      uuid
      name
      type
      holder
      objective
      dueDate
      incomes {
        uuid
        date
        quantity
        value
        bought
        sold
        gross
        ir
        fee
      }
    }
  }
`
