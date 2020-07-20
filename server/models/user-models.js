const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema(
	{
		userName: { type: String, required: true },
		artists: { type: [ String ], required: true },
		friends: { type: [ String ], required: false },
		imgUrl: { type: String, required: false }
	},
	{ timestamps: true }
);

module.exports = mongoose.model('user', User);
