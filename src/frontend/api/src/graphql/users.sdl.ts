export const schema = gql`
  type User {
    id: Int!
    name: String
    stem: String
    attestation: String
    qualification: String
    rtg_preference: Float
    ct_preference: Float
    UserSchedule: [UserSchedule]!
    UserScheduleDay: [UserScheduleDay]!
  }

  type Query {
    users: [User!]! @requireAuth
    user(id: Int!): User @requireAuth
  }

  input CreateUserInput {
    name: String
    stem: String
    attestation: String
    qualification: String
    rtg_preference: Float
    ct_preference: Float
  }

  input UpdateUserInput {
    name: String
    stem: String
    attestation: String
    qualification: String
    rtg_preference: Float
    ct_preference: Float
  }

  type Mutation {
    createUser(input: CreateUserInput!): User! @requireAuth
    updateUser(id: Int!, input: UpdateUserInput!): User! @requireAuth
    deleteUser(id: Int!): User! @requireAuth
  }
`
