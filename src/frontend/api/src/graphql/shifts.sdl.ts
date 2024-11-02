export const schema = gql`
  type Shift {
    id: Int!
    type: String!
    employeeType: String!
    department: String!
    amount: Int!
    qualification: String!
    ShiftSlot: [ShiftSlot]!
  }

  type Query {
    shifts: [Shift!]! @requireAuth
    shift(id: Int!): Shift @requireAuth
  }

  input CreateShiftInput {
    type: String!
    employeeType: String!
    department: String!
    amount: Int!
    qualification: String!
  }

  input UpdateShiftInput {
    type: String
    employeeType: String
    department: String
    amount: Int
    qualification: String
  }

  type Mutation {
    createShift(input: CreateShiftInput!): Shift! @requireAuth
    updateShift(id: Int!, input: UpdateShiftInput!): Shift! @requireAuth
    deleteShift(id: Int!): Shift! @requireAuth
  }
`
