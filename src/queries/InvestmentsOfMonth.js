import gql from 'graphql-tag'

export default gql`
  {
    investmentsOfMonth {
      uuid
      name
      type
      holder
      lastIncome {
        uuid
        quantity
        value
      }
    }
  }
`
