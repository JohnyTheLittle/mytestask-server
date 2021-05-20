const { gql } = require('apollo-server-express')

module.exports = gql`
  type User {
    id: ID!
    email: String!
    username: String!
    admin: Boolean!
  }
  type Query {
    me: User!
    user(username: String): User!
  }
  type Mutation {
    signUp(username: String!, email: String!, password: String!): String!
    signIn(email: String!, password: String, email: String): String
  }
`
