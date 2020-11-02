const express = require('express');
const router = express.Router();

const MongoClient = require('mongodb').MongoClient;

const Gpio = require('onoff').Gpio;

const LED = new Gpio(22, 'out');

// on off led
router.post('/led', async (req, res) => {
    //todo request body serialization and validation

    //parsing
    const onoff = req.body.hasOwnProperty('onoff');
    
    LED.writeSync(onoff ? 1: 0)

    res.send({
        
    })
});


// // every 7 minutes
// setInterval((param1)=> {
//     service.queryAirQuality(async (data) => {
//         // convert JSON object to String
//         const jsonStr = JSON.stringify(data);
//
//         // read json string to Buffer
//         const buf = Buffer.from(jsonStr);
//
//         const options = { cidVersion: 1 };
//
//         let bufRes = undefined;
//
//         try {
//             bufRes = await ipfs2.add(buf, options);
//             console.log(bufRes);
//         } catch (e) {
//             console.log(bufRes);
//         }
//
//         // Create a new MongoClient
//         const client = new MongoClient(constants.MONGODB_URL,  { useNewUrlParser: true });
//
//         // Use connect method to connect to the Server
//         client.connect(function(err) {
//             if (err) {
//                 console.log(err)
//             }
//
//             const db = client.db(constants.MONGODB_NAME);
//
//             const doc = { metadata: {
//                     name: data.name,
//                     user: data.user,
//                     time: data.time,
//                     type: constants.AIR_QUALITY
//                 }, options: options, hash: bufRes[0].hash };
//
//             db.collection(constants.AIR_QUALITY).insertOne(doc, function (err, result) {
//                 client.close();
//             })
//         });
//
//     })
// }, 20000);
//
//every 5 minute
// setInterval(()=> {
//     energyMonitorService.queryEnergyMonitor(async (data) => {
//         // convert JSON object to String
//         const jsonStr = JSON.stringify(data);
//
//         // read json string to Buffer
//         const buf = Buffer.from(jsonStr);
//
//         const options = { cidVersion: 1 };
//
//         let bufRes = undefined;
//
//         try {
//             bufRes = await ipfs3.add(buf, options);
//             console.log(bufRes);
//         } catch (e) {
//             console.log(bufRes);
//         }
//
//         // Create a new MongoClient
//         const client = new MongoClient(constants.MONGODB_URL,  { useNewUrlParser: true });
//
//         // Use connect method to connect to the Server
//         client.connect(function(err) {
//             if (err) {
//                 console.log(err)
//             }
//
//             const db = client.db(constants.MONGODB_NAME);
//
//             const doc = { metadata: {
//                     name: data.name,
//                     user: data.user,
//                     time: data.time,
//                     type: constants.ENERGY_MONITOR
//                 }, options: options, hash: bufRes[0].hash };
//
//             db.collection(constants.ENERGY_MONITOR).insertOne(doc, function (err, result) {
//                 client.close();
//             })
//         });
//     })
// }, 20000);

module.exports = router;