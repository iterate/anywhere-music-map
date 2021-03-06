const mongoose = require('mongoose')
const Schema = mongoose.Schema

const User = new Schema(
  {
    userName: { type: Object, required: true },
    artists: { type: [Object], required: true },
    friends: { type: [Object], required: false },
    imgUrl: { type: String, required: false }
  },
  { timestamps: true }
)

module.exports = mongoose.model('user', User)
