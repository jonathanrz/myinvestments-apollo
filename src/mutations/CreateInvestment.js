import gql from 'graphql-tag'

export default gql`
  mutation CreateInvestment($data: InvestmentInput!) {
    createInvestment(data: $data) {
      uuid
    }
  }
`
