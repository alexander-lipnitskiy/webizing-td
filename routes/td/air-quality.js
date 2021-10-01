const express = require('express');
const router = express.Router();

const airQuality = require('../../sensors/AirQuality');
const utils = require('../../utils/thing-description');

router.get('/', function(req, res, next) {
    res.send(utils.addDefaultValues(airQuality));
    // if (req.accepts('text/html')) {
    //     res.render('./thing-details', { model: utils.addDefaultValues(airQuality), baseUrl: req.baseUrl });
    // }else {
    //     res.send(utils.addDefaultValues(airQuality));
    // }
});

router.get('/:property', function(req, res, next) {
    const property = req.params.property.toString();
    const withDefault = utils.addDefaultValues(airQuality);

    if (req.accepts('text/html')) {
        res.render('./thing-property-details', { property: withDefault.properties[property], context: withDefault['@context']});
    }else {
        res.send(utils.addDefaultValues(airQuality).properties[property]);
    }
});

module.exports = router;
