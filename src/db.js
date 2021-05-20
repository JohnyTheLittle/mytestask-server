const mongoose = require('mongoose')
require('dotenv').config()
const uri = process.env.DB_URI
module.exports = {
  connect: () => {
    mongoose
      .connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 6000,
      })
      .catch((err) => console.log(err.reason))
  },
  close: () => {
    mongoose.connection.close()
  },
}
