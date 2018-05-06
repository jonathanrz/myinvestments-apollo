import gql from 'graphql-tag'

export default gql`
  query Investment($uuid: String!) {
    investment(uuid: $uuid) {
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
