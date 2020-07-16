const Music = require('../models/music-models');

createMusic = (req, res) => {
	const body = req.body;
	console.log('body', body);

	if (!body) {
		return res.status(400).json({
			success: false,
			error: 'You must provide a music'
		});
	}

	const music = new Music(body);

	if (!music) {
		return res.status(400).json({ success: false, error: err });
	}

	music
		.save()
		.then(() => {
			return res.status(201).json({
				success: true,
				id: music._id,
				message: 'Music created!'
			});
		})
		.catch((error) => {
			return res.status(400).json({
				error,
				message: 'Music not created!'
			});
		});
};

updateMusic = async (req, res) => {
	const body = req.body;

	if (!body) {
		return res.status(400).json({
			success: false,
			error: 'You must provide a body to update'
		});
	}

	Music.findOne({ _id: req.params.id }, (err, music) => {
		if (err) {
			return res.status(404).json({
				err,
				message: 'Music not found!'
			});
		}
		music.name = body.name;
		music.time = body.time;
		music.rating = body.rating;
		music
			.save()
			.then(() => {
				return res.status(200).json({
					success: true,
					id: music._id,
					message: 'Music updated!'
				});
			})
			.catch((error) => {
				return res.status(404).json({
					error,
					message: 'Music not updated!'
				});
			});
	});
};

deleteMusic = async (req, res) => {
	await Music.findOneAndDelete({ _id: req.params.id }, (err, music) => {
		if (err) {
			return res.status(400).json({ success: false, error: err });
		}

		if (!music) {
			return res.status(404).json({ success: false, error: `Music not found` });
		}

		return res.status(200).json({ success: true, data: music });
	}).catch((err) => console.log(err));
};

getMusicById = async (req, res) => {
	await Music.findOne({ _id: req.params.id }, (err, music) => {
		if (err) {
			return res.status(400).json({ success: false, error: err });
		}

		if (!music) {
			return res.status(404).json({ success: false, error: `Music not found` });
		}
		return res.status(200).json({ success: true, data: music });
	}).catch((err) => console.log(err));
};

getMusic = async (req, res) => {
	console.log('get music', req.body);
	await Music.find({}, (err, music) => {
		if (err) {
			return res.status(400).json({ success: false, error: err });
		}
		if (!music.length) {
			return res.status(404).json({ success: false, error: `Music not found` });
		}
		return res.status(200).json({ success: true, data: music });
	}).catch((err) => console.log(err));
};

module.exports = {
	createMusic,
	updateMusic,
	deleteMusic,
	getMusic,
	getMusicById
};
