import gql from 'graphql-tag'

export default gql`
  mutation CreateInvestment($data: InvestmentInput!) {
    createInvestment(data: $data) {
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
