// mongodb routes for smart watch

const express = require('express');
const router = express.Router();

const constants = require('../constants');

const MongoClient = require('mongodb').MongoClient;

const ipfsClient = require('ipfs-http-client');
const service = require('../services/air-quality-service');
const energyMonitorService = require('../services/energy-monitor-service');
// connect to ipfs daemon API server
const ipfs = ipfsClient('localhost', '5001', { protocol: 'http' });


router.get('/heart-rate', async (req,res) => {
    MongoClient.connect(constants.MONGODB_URL, { useNewUrlParser: true }, function (err, client) {
        if (err) throw err;

        const db = client.db(constants.MONGODB_NAME);

        const output = db.collection(constants.HEART_RATE).find({user: 'alex'}).sort({startDate: -1}).limit(1).toArray(function(err, docs) {
            client.close();

            if(docs.length > 0) {
                res.status(200).send(docs[0]);
            } else {
                res.status(204).send();
            }
        });
    });
});

router.post('/heart-rate', async (req, res) => {
    const content = req.body.data || undefined;

    const ipfsData = [];

    for await (let item of content) {
        try {
            ipfsData.push(item);
        } catch (e) {
            console.log(e);
        }
    }

    MongoClient.connect(constants.MONGODB_URL, { useNewUrlParser: true }, async function (err, client) {
        const db = client.db(constants.MONGODB_NAME);

        let bulk = [];

        for (let item of ipfsData) {
            bulk.push(item);
        }

        const resQuery = await db.collection(constants.HEART_RATE).insertMany(bulk);

        res.status(201).send(resQuery.ops);
    });
});

router.get('/step-count', async (req,res) => {
    MongoClient.connect(constants.MONGODB_URL, { useNewUrlParser: true }, function (err, client) {
        if (err) throw err;

        const db = client.db(constants.MONGODB_NAME);

        const output = db.collection(constants.STEP_COUNT).find({user: 'alex'}).sort({startDate: -1}).limit(1).toArray(function(err, docs) {
            client.close();

            if(docs.length > 0) {
                res.status(200).send(docs[0]);
            } else {
                res.status(204).send();
            }
        });
    });
});

router.post('/step-count', async (req, res) => {
    const content = req.body.data || undefined;

    const ipfsData = [];

    for await (let item of content) {
        try {
            ipfsData.push(item);
        } catch (e) {
            console.log(e);
        }
    }

    MongoClient.connect(constants.MONGODB_URL, { useNewUrlParser: true }, async function (err, client) {
        const db = client.db(constants.MONGODB_NAME);

        let bulk = [];

        for (let item of ipfsData) {
            bulk.push(item);
        }

        const resQuery = await db.collection(constants.STEP_COUNT).insertMany(bulk);

        res.status(201).send(resQuery.ops);
    });
});


router.get('/exercise-time', async (req,res) => {
    MongoClient.connect(constants.MONGODB_URL, { useNewUrlParser: true }, function (err, client) {
        if (err) throw err;

        const db = client.db(constants.MONGODB_NAME);

        try {
            const output = db.collection(constants.EXERCISE_TIME).find({user: 'alex'}).sort({startDate: -1}).limit(1).toArray(function(err, docs) {
                client.close();

                if(docs.length > 0) {
                    res.status(200).send(docs[0]);
                } else {
                    res.status(204).send();
                }
            });
        } catch (e) {
            res.status(500).send();
        }

    });
});

router.post('/exercise-time', async (req, res) => {
    const content = req.body.data || undefined;

    const ipfsData = [];

    for await (let item of content) {

        try {
            ipfsData.push(item);
        } catch (e) {
            console.log(e);
        }
    }

    MongoClient.connect(constants.MONGODB_URL, { useNewUrlParser: true }, async function (err, client) {
        const db = client.db(constants.MONGODB_NAME);

        let bulk = [];

        for (let item of ipfsData) {
            bulk.push(item);
        }

        const resQuery = await db.collection(constants.EXERCISE_TIME).insertMany(bulk);

        res.status(201).send(resQuery.ops);
    });
});

router.get('/sleep', async (req,res) => {
    MongoClient.connect(constants.MONGODB_URL, { useNewUrlParser: true }, function (err, client) {
        if (err) throw err;

        const db = client.db(constants.MONGODB_NAME);

        const output = db.collection(constants.SLEEP).find({user: 'alex'}).sort({startDate: -1}).limit(1).toArray(function(err, docs) {
            client.close();

            if(docs.length > 0) {
                res.status(200).send(docs[0]);
            } else {
                res.status(204).send();
            }
        });
    });
});

router.post('/sleep', async (req, res) => {
    const content = req.body.data || undefined;

    const ipfsData = [];

    for await (let item of content) {
        try {
            ipfsData.push(item);
        } catch (e) {
            console.log(e);
        }
    }

    MongoClient.connect(constants.MONGODB_URL, { useNewUrlParser: true }, async function (err, client) {
        const db = client.db(constants.MONGODB_NAME);

        let bulk = [];

        for (let item of ipfsData) {
            bulk.push(item);
        }

        const resQuery = await db.collection(constants.SLEEP).insertMany(bulk);

        res.status(201).send(resQuery.ops);
    });
});

router.get('/stand-hour', async (req,res) => {
    MongoClient.connect(constants.MONGODB_URL, { useNewUrlParser: true }, function (err, client) {
        if (err) throw err;

        const db = client.db(constants.MONGODB_NAME);

        const output = db.collection(constants.EXERCISE_TIME).find({user: 'alex'}).sort({startDate: -1}).limit(1).toArray(function(err, docs) {
            client.close();

            if(docs.length > 0) {
                res.status(200).send(docs[0]);
            } else {
                res.status(204).send();
            }
        });
    });
});

router.post('/stand-hour', async (req, res) => {
    const content = req.body.data || undefined;

    const ipfsData = [];

    for await (let item of content) {

        try {
            ipfsData.push(item);
        } catch (e) {
            console.log(e);
        }
    }

    MongoClient.connect(constants.MONGODB_URL, { useNewUrlParser: true }, async function (err, client) {
        const db = client.db(constants.MONGODB_NAME);

        let bulk = [];

        for (let item of ipfsData) {
            bulk.push(item);
        }

        const resQuery = await db.collection(constants.STAND_HOUR).insertMany(bulk);

        res.status(201).send(resQuery.ops);
    });
});

// every 7 minutes
// setInterval((param1)=> {
//     service.queryAirQuality(async (data) => {
//         console.log('queryAirQuality')
//         // convert JSON object to String
//         const jsonStr = JSON.stringify(data);

//         // read json string to Buffer
//         const buf = Buffer.from(jsonStr);

//         const options = { cidVersion: 1 };

//         let bufRes = undefined;

//         try {
//             bufRes = await ipfs.add(buf, options);
//             console.log(bufRes);
//         } catch (e) {
//             console.log(bufRes);
//         }

//         // Create a new MongoClient
//         const client = new MongoClient(constants.MONGODB_URL,  { useNewUrlParser: true });

//         // Use connect method to connect to the Server
//         client.connect(function(err) {
//             if (err) {
//                 console.log(err)
//             }

//             const db = client.db(constants.MONGODB_NAME);

//             const doc = { metadata: {
//                     name: data.name,
//                     user: data.user,
//                     time: data.time,
//                     type: constants.AIR_QUALITY
//                 }, options: options, hash: bufRes[0].hash };

//             db.collection(constants.AIR_QUALITY).insertOne(doc, function (err, result) {
//                 client.close();
//             })
//         });

//     })
// }, 20000);

// //every 5 minute
// setInterval(()=> {
//     energyMonitorService.queryEnergyMonitor(async (data) => {
//         console.log('queryEnergyMonitor')
//         // convert JSON object to String
//         const jsonStr = JSON.stringify(data);

//         // read json string to Buffer
//         const buf = Buffer.from(jsonStr);

//         const options = { cidVersion: 1 };

//         let bufRes = undefined;

//         try {
//             bufRes = await ipfs.add(buf, options);
//             console.log(bufRes);
//         } catch (e) {
//             console.log(bufRes);
//         }

//         // Create a new MongoClient
//         const client = new MongoClient(constants.MONGODB_URL,  { useNewUrlParser: true });

//         // Use connect method to connect to the Server
//         client.connect(function(err) {
//             if (err) {
//                 console.log(err)
//             }

//             const db = client.db(constants.MONGODB_NAME);

//             const doc = { metadata: {
//                     name: data.name,
//                     user: data.user,
//                     time: data.time,
//                     type: constants.ENERGY_MONITOR
//                 }, options: options, hash: bufRes[0].hash };

//             db.collection(constants.ENERGY_MONITOR).insertOne(doc, function (err, result) {
//                 client.close();
//             })
//         });
//     })
// }, 20000);

module.exports = router;
