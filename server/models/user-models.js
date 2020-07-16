const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema(
	{
		userName: { type: String, required: true },
		artists: { type: [ String ], required: true }
	},
	{ timestamps: true }
);

module.exports = mongoose.model('user', User);
