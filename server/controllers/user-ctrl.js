const User = require('../models/user-models')

createUser = (req, res) => {
  const body = req.body
  if (!body) {
    return res.status(400).json({
      success: false,
      error: 'You must provide a user'
    })
  }
  //check if user already exists
  User.find({}, (err, users) => {
    for (let user in users) {
      if (users[user].userName === body.userName) {
        return res.status(201).json({ success: true, message: 'user exists' })
      }
    }
    const user = new User(body)
    if (!user) {
      return res.status(400).json({ success: false, error: err })
    }
    user
      .save()
      .then(() => {
        return res.status(201).json({
          success: true,
          id: user._id,
          message: 'User created!'
        })
      })
      .catch(error => {
        return res.status(400).json({
          error,
          message: 'User not created!'
        })
      })
  })
}

updateUser = async (req, res) => {
  const body = req.body

  if (!body) {
    return res.status(400).json({
      success: false,
      error: 'You must provide a body to update'
    })
  }

  User.findOne({ userName: req.params.id }, (err, user) => {
    if (err) {
      return res.status(404).json({
        err,
        message: 'User not found!'
      })
    }

    if (user.friends.includes(body.friends)) {
      return
    } else user.friends.push(body.friends)

    user
      .save()
      .then(() => {
        return res.status(200).json({
          success: true,
          id: user.userName,
          message: 'User updated!'
        })
      })
      .catch(error => {
        return res.status(404).json({
          error,
          message: 'User not updated!'
        })
      })
  })
}

deleteUser = async (req, res) => {
  await User.findOneAndDelete({ _id: req.params.id }, (err, user) => {
    if (err) {
      return res.status(400).json({ success: false, error: err })
    }

    if (!user) {
      return res.status(404).json({ success: false, error: `User not found` })
    }

    return res.status(200).json({ success: true, data: user })
  }).catch(err => console.log(err))
}

deleteAllUsers = async (req, res) => {
  //sofie123
  //1118536426
  //Sherveer Singh Pannu
  //Philip Dahlstrøm
  //Thusan Arul'
  //josefine-madsen

  await User.deleteMany({ userName: '1118536426' }, (err, user) => {
    if (err) {
      return res.status(400).json({ success: false, error: err })
    }
    return res.status(200).json({ success: true, data: user })
  }).catch(err => console.log(err))
}

getUserById = async (req, res) => {
  await User.findOne({ _id: req.params.id }, (err, user) => {
    if (err) {
      return res.status(400).json({ success: false, error: err })
    }

    if (!user) {
      return res.status(404).json({ success: false, error: `User not found` })
    }
    return res.status(200).json({ success: true, data: user })
  }).catch(err => console.log(err))
}

getUser = async (req, res) => {
  await User.find({}, (err, user) => {
    if (err) {
      return res.status(400).json({ success: false, error: err })
    }
    if (!user.length) {
      return res.status(404).json({ success: false, error: `User not found` })
    }
    return res.status(200).json({ success: true, data: user })
  }).catch(err => console.log(err))
}

module.exports = {
  createUser,
  updateUser,
  deleteUser,
  deleteAllUsers,
  getUser,
  getUserById
}
