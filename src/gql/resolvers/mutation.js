const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { AuthenticationError, ForbiddenError } = require('apollo-server-express')

require('dotenv').config()
module.exports = {
  signUp: async (parent, { username, password, email }, { models }) => {
    email = email.trim().toLowerCase()
    const hashed = await bcrypt.hash(password, 10)
    try {
      const user = await models.User.create({
        username,
        email,
        password: hashed,
      })
      return jwt.sign({ id: user._id }, process.env.JWT_SECRET)
    } catch (err) {
      console.log(err)
      throw new Error('something wrong')
    }
  },
  signIn: async (parent, { username, email, password }, { models }) => {
    if (email) {
      email = email.trim().toLowerCase()
    }
    const user = await models.User.findOne({
      $or: [{ email }, { username }],
    })

    if (!user) {
      throw new AuthenticationError('There is no such user')
    }
    const valid = await bcrypt.compare(password, user.password)
    if (!valid) {
      throw new AuthenticationError('Wrong password, human')
    }
    return jwt.sign({ id: user._id }, process.env.JWT_SECRET)
  },
}
