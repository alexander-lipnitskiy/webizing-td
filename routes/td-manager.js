// mongodb routes for smart watch

const express = require('express');
const router = express.Router();

const constants = require('../constants');

const MongoClient = require('mongodb').MongoClient;

router.get('/td', async (req,res) => {
    MongoClient.connect(constants.MONGODB_URL, { useNewUrlParser: true }, function (err, client) {
        if (err) throw err;

        const db = client.db(constants.MONGODB_NAME_TD);

        db.collection('td').find().toArray(function(err, docs) {
            client.close();

            if(docs.length > 0) {
                res.status(200).send(docs);
            } else {
                res.status(204).send();
            }
        });
    });
});

router.post('/td', async (req, res) => {
    const content = req.body.data || undefined;

    MongoClient.connect(constants.MONGODB_URL, { useNewUrlParser: true }, async function (err, client) {
        const db = client.db(constants.MONGODB_NAME_TD);

        const resQuery = await db.collection('td').insertOne(content);

        res.status(201).send(resQuery.ops);
    });
});

router.get('/:id', async (req,res) => {
    MongoClient.connect(constants.MONGODB_URL, { useNewUrlParser: true }, function (err, client) {
        if (err) throw err;

        const db = client.db(constants.MONGODB_NAME_TD);

        db.collection('td').find({ "name": req.params.id }).toArray(function(err, docs) {
            client.close();

            if(docs.length > 0) {
                res.status(200).send(docs[0][req.params.id]);
            } else {
                res.status(204).send();
            }
        });
    }); 
});

router.get('/:id/properties/:name', async (req,res) => {
    MongoClient.connect(constants.MONGODB_URL, { useNewUrlParser: true }, function (err, client) {
        if (err) throw err;

        const db = client.db(constants.MONGODB_NAME_TD);

        db.collection('td').find({ "name": req.params.id }).toArray(function(err, docs) {
            client.close();

            if(docs.length > 0) {
                res.status(200).send(docs[0][req.params.id].properties[req.params.name]);
            } else {
                res.status(204).send();
            }
        });
    }); 
});




module.exports = router;
