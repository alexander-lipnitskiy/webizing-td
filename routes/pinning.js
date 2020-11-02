const express = require('express');
const router = express.Router();

const MongoClient = require('mongodb').MongoClient;

const ipfsClient = require('ipfs-http-client');

const constants = require('../constants');

const fs = require('fs');
const path = require('path');

//services
const threadConfig = require('../config.json');
const service = require('../services/air-quality-service');
const energyMonitorService = require('../services/energy-monitor-service');

// connect to ipfs daemon API server
const ipfs = ipfsClient('localhost', '5001', { protocol: 'http' });
const ipfs1 = ipfsClient('localhost', '5011', { protocol: 'http' });
const ipfs2 = ipfsClient('localhost', '5021', { protocol: 'http' });
const ipfs3 = ipfsClient('localhost', '5031', { protocol: 'http' });
const ipfs4 = ipfsClient('localhost', '5041', { protocol: 'http' });
const ipfs5 = ipfsClient('localhost', '5051', { protocol: 'http' });


//     /* The "pinataMetadata" object will not be part of your content added to IPFS */
//     /* Pinata simply stores the metadata provided to help you easily query your JSON object pins */
//     options: {
//         cidVersion: (the integer for your desired CID version)
//     },
//     pinataMetadata: {
//         name: (optional) - This is a custom name you can have for referencing your JSON object. This will be displayed in the Pin explorer "name" column if provided,
//         keyvalues: {
//             customKey: customValue,
//             customKey2: customValue2
//         }
//     },
//     /* The contents of the "pinataContent" object will be added to IPFS */
//     /* The hash provided back will only represent the JSON contained in this object */
//     /* The JSON the returned hash links to will NOT contain the "pinataMetadata" object above */
//     pinataContent: {
//         Any valid JSON goes here
//     }

router.post('/json', async (req, res) => {
    //todo request body serialization and validation

    //parsing
    const cidVersion = req.body.hasOwnProperty('options') ? (req.body.options.cidVersion || undefined): undefined;
    // metadata type name timestamp
    const metadata = req.body.metadata || undefined;
    const content = req.body.content || undefined;

    // convert JSON object to String
    const jsonStr = JSON.stringify(content);

    // read json string to Buffer
    const buf = Buffer.from(jsonStr);

    const options = cidVersion ? {cidVersion: cidVersion} : undefined;

    let bufRes = undefined;

    try {
        bufRes = await ipfs.add(buf, options);
    } catch (e) {
        console.log(bufRes);
        res.status(500).send(e);
    }

    // Create a new MongoClient
    const client = new MongoClient(constants.MONGODB_URL,  { useNewUrlParser: true });

    // Use connect method to connect to the Server
    client.connect(function(err) {
        if (err) {
            res.status(500).send(err);
        }

        const db = client.db(constants.MONGODB_NAME);

        const doc = { metadata: metadata, options: { cidVersion: cidVersion }, hash: bufRes || bufRes[0].hash };

        db.collection(jsonPin).insertOne(doc, function (err, result) {
            client.close();
            res.send({
                ipfsHash: result.ops[0].hash[0].hash,
                pinSize: result.ops[0].hash[0].size,
                date: Date.now()
            })
        })
    });
});

module.exports = router;
