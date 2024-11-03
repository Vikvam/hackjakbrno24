export const schema = gql`
  type ShiftSlot {
    id: Int!
    date: DateTime!
    shift: Shift!
    shiftId: Int!
  }

  type Query {
    shiftSlots: [ShiftSlot!]! @requireAuth
    shiftSlot(id: Int!): ShiftSlot @requireAuth
  }

  input CreateShiftSlotInput {
    date: DateTime!
    shiftId: Int!
  }

  input UpdateShiftSlotInput {
    date: DateTime
    shiftId: Int
  }

  type Mutation {
    createShiftSlot(input: CreateShiftSlotInput!): ShiftSlot! @requireAuth
    updateShiftSlot(id: Int!, input: UpdateShiftSlotInput!): ShiftSlot!
      @requireAuth
    deleteShiftSlot(id: Int!): ShiftSlot! @requireAuth
  }
`
