import gql from 'graphql-tag'

export default gql`
  mutation UpdateIncome($uuid: String!, $data: IncomeInput!) {
    updateIncome(uuid: $uuid, data: $data) {
      uuid
      date
      quantity
      value
      bought
      sold
      gross
      ir
      fee
      investment {
        uuid
      }
    }
  }
`
