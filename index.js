const express = require('express')
const db = require('./src/db')
const jwt = require('jsonwebtoken')
const models = require('./src/models/index')
require('dotenv').config()
const { ApolloServer, gql } = require('apollo-server-express')
const helmet = require('helmet')
const cors = require('cors')

const PORT = process.env.PORT 
db.connect()
const app = express()
app.use(helmet())
app.use(cors())
const typeDefs = require('./src/gql/typeDefs/schema')
const resolvers = require('./src/gql/resolvers')

const getUser = (token) => {
    if (token) {
      try {
        return jwt.verify(token, process.env.JWT_SECRET)
      } catch (err) {
        throw new Error('Session invalid')
      }
    }
  }
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    const token = req.headers.authorization
    const user = getUser(token)
    return {models, user}
  },
})

server.applyMiddleware({ app, path: '/api' })
app.listen(PORT , () => {
  console.log(`server is running on localhost${PORT}/api`)
})
