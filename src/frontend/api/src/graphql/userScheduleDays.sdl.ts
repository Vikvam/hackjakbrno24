export const schema = gql`
  type UserScheduleDay {
    id: Int!
    userScheduleId: Int!
    userSchedule: UserSchedule!
    userId: Int!
    user: User!
    preference: Int!
    reasonCode: Int!
    reasonText: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    shiftSlotId: Int!
    shiftSlot: ShiftSlot!
  }

  type Query {
    userScheduleDays: [UserScheduleDay!]! @requireAuth
    userScheduleDay(id: Int!): UserScheduleDay @requireAuth
  }

  input CreateUserScheduleDayInput {
    userScheduleId: Int!
    userId: Int!
    preference: Int!
    reasonCode: Int!
    reasonText: String!
    shiftSlotId: Int!
  }

  input UpdateUserScheduleDayInput {
    userScheduleId: Int
    userId: Int
    preference: Int
    reasonCode: Int
    reasonText: String
    shiftSlotId: Int
  }

  type Mutation {
    createUserScheduleDay(input: CreateUserScheduleDayInput!): UserScheduleDay!
      @requireAuth
    updateUserScheduleDay(
      id: Int!
      input: UpdateUserScheduleDayInput!
    ): UserScheduleDay! @requireAuth
    deleteUserScheduleDay(id: Int!): UserScheduleDay! @requireAuth
  }
`
