module.exports = {
    me: async (parent, args, { models, user }) => {
        return await models.User.findById(user.id)
      },
}