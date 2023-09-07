const { gql } = require('appolo-server');

module.exports = qgl`
type User {
  userName: String
  email: String
  password: String
  token: String
}

input RegisterInput {
  userName: String
  email: String
  password: String
}

input LoginInput {
  email: String
  password: String
}

type Query {
  user(id: ID!): User
}

type Mutation {
  registerUser(registerInput: RegisterInput): User
  loginUser(loginInput: LoginInput): User
}
`