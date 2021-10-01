// mongodb routes for smart watch
const express = require('express');
const router = express.Router();
const airQuality = require('../../sensors/AirQuality.json')


router.get('/air-quality', async (req,res) => {
    res.status(200).send(airQuality);
});

module.exports = router;

