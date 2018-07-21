import gql from 'graphql-tag'

export default gql`
  mutation CreateIncome($investmentUuid: String!, $data: IncomeInput!) {
    createIncome(investmentUuid: $investmentUuid, data: $data) {
      uuid
    }
  }
`
