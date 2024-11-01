export const schema = gql`
  type UserScheduleDay {
    id: Int!
    userScheduleId: Int!
    userSchedule: UserSchedule!
    user: User!
    day: DateTime!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type Query {
    userScheduleDays: [UserScheduleDay!]! @requireAuth
    userScheduleDay(id: Int!): UserScheduleDay @requireAuth
  }

  input CreateUserScheduleDayInput {
    userScheduleId: Int!
    day: DateTime!
  }

  input UpdateUserScheduleDayInput {
    userScheduleId: Int
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
