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
    Shift: Shift
    shiftId: Int
    day: DateTime!
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
    shiftId: Int
    day: DateTime!
  }

  input UpdateUserScheduleDayInput {
    userScheduleId: Int
    userId: Int
    preference: Int
    reasonCode: Int
    reasonText: String
    shiftId: Int
    day: DateTime
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
