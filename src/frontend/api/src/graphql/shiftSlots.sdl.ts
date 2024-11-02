export const schema = gql`
  type ShiftSlot {
    id: Int!
    date: DateTime!
    type: String!
    department: String!
    amount: Int!
    qualification: String!
  }

  type Query {
    shiftSlots: [ShiftSlot!]! @requireAuth
    shiftSlot(id: Int!): ShiftSlot @requireAuth
  }

  input CreateShiftSlotInput {
    date: DateTime!
    type: String!
    department: String!
    amount: Int!
    qualification: String!
  }

  input UpdateShiftSlotInput {
    date: DateTime
    type: String
    department: String
    amount: Int
    qualification: String
  }

  type Mutation {
    createShiftSlot(input: CreateShiftSlotInput!): ShiftSlot! @requireAuth
    updateShiftSlot(id: Int!, input: UpdateShiftSlotInput!): ShiftSlot!
      @requireAuth
    deleteShiftSlot(id: Int!): ShiftSlot! @requireAuth
  }
`
