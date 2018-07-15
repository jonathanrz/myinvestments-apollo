import gql from 'graphql-tag'

export default gql`
  query Invcome($uuid: String!) {
    income(uuid: $uuid) {
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
`
