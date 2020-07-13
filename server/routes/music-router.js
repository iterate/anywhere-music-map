const express = require('express')

const MusicCtrl = require('../controllers/music-ctrl')

const router = express.Router()

router.post('/music', MusicCtrl.createMusic)
router.put('/music/:id', MusicCtrl.updateMusic)
router.delete('/music/:id', MusicCtrl.deleteMusic)
router.get('/music/:id', MusicCtrl.getMusicById)
router.get('/music', MusicCtrl.getMusic)

module.exports = router