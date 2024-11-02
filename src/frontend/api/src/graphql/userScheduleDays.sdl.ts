export const schema = gql`
  type UserScheduleDay {
    id: Int!
    userScheduleId: Int!
    userSchedule: UserSchedule!
    user: User!
    day: DateTime!
    dayPart: Int!
    preference: Int!
    reasonCode: Int!
    reasonText: String!
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
    dayPart: Int!
    preference: Int!
    reasonCode: Int!
    reasonText: String!
  }

  input UpdateUserScheduleDayInput {
    userScheduleId: Int
    day: DateTime
    dayPart: Int
    preference: Int
    reasonCode: Int
    reasonText: String
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
