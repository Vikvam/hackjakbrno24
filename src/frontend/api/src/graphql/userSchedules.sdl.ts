export const schema = gql`
  type UserSchedule {
    id: Int!
    userId: Int!
    user: User!
    schedule: DateTime!
    createdAt: DateTime!
    updatedAt: DateTime!
    UserScheduleDay: [UserScheduleDay]!
  }

  type Query {
    userSchedules: [UserSchedule!]! @requireAuth
    userSchedule(id: Int!): UserSchedule @requireAuth
  }

  input CreateUserScheduleInput {
    userId: Int!
    schedule: DateTime!
  }

  input UpdateUserScheduleInput {
    userId: Int
    schedule: DateTime
  }

#  input CreateUserScheduleWithDays {
#    userId: Int
#    schedule: DateTime
#    UserScheduleDay: [UserScheduleDay]
#  }

  type Mutation {
    createUserSchedule(input: CreateUserScheduleInput!): UserSchedule!
      @requireAuth
    updateUserSchedule(
      id: Int!
      input: UpdateUserScheduleInput!
    ): UserSchedule! @requireAuth
    deleteUserSchedule(id: Int!): UserSchedule! @requireAuth

  }
`
