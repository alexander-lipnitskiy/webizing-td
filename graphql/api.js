const MongoClient = require('mongodb').MongoClient;
const constants = require('../constants');

const ipfsClient = require('ipfs-http-client');
// connect to ipfs daemon API server
const ipfs = ipfsClient('localhost', '5001', { protocol: 'http' });

// The root provides a resolver function for each API endpoint
const root = {
    // get latest data
    // airQuality: async ({names}) => {
    //     const LIMIT = 1000;
    //     let data = [];
    //     try {
    //         const list = await ipfs.files.list(threadConfig[AIR_QUALITY].id, "", LIMIT);
    //
    //         if (list !== undefined) {
    //             for await (let item of list.items) {
    //                 const buf = await textileAirQuality.blocks.fileContent(item.block);
    //                 const str = String.fromCharCode.apply(null, new Uint8Array(buf));
    //                 data.push(JSON.parse(str))
    //             }
    //         }
    //     }catch (e) {
    //         if(e.message === "Not Found") {
    //             console.log("airQuality not found")
    //         }
    //     }
    //
    //     let output = [];
    //     let uniqueAirQualityNames = [];
    //
    //     if (names && names.length) {
    //         uniqueAirQualityNames = names;
    //     } else {
    //         const map = new Map();
    //         for (const item of data) {
    //             if(!map.has(item.name)){
    //                 map.set(item.name, true);    // set any value to Map
    //                 uniqueAirQualityNames.push(item.name);
    //             }
    //         }
    //     }
    //
    //     for (let i = 0; i < uniqueAirQualityNames.length; i++) {
    //         const filteredData = data.filter(item => item.name === uniqueAirQualityNames[i]);
    //
    //         filteredData.sort((a,b) => {
    //             return new Date(b.time) - new Date(a.time)
    //         });
    //
    //         output.push({...filteredData[0]})
    //     }
    //
    //     return output
    // },
    airQuality: async (_, {names}, request) => {
        // Create a new MongoClient
        const client = new MongoClient(constants.MONGODB_URL);

        await client.connect();

        const db = client.db('k-log-pinning-service');

        // Get the collection
        const col = db.collection(constants.AIR_QUALITY);

        const queryResults = await col.find({
            'metadata.name': { $in: names }
        }).limit(1).toArray();
console.log('queryResults' +queryResults)
        await client.close();
console.log('queryResults[0]'+ queryResults[0].hash)
        //const buf = await ipfs.get(queryResults[0].hash);

        return [{"name":"Lab-Foobot02","user":"lab@wrl.onl","address":"Seoul, Seongbuk-gu, Wolgok 2(i)-dong, 화랑로 14길 5, Laboratory 8","room":"livinglab","location":"-","time":"2020-10-07T12:20:44+09:00","particle":11.980011,"temp":24.599,"humidity":35.561,"co2":699,"voc":194,"pollution":21.837154}]
        // const getAirQuality = new Promise(function(resolve, reject) {
        //     client.connect(err => {
        //         if (err) {
        //             res.status(500).send(err);
        //         }
        //
        //         const db = client.db(constants.MONGODB_NAME);
        //
        //         return
        //     });
        // });
        // let docs = await getAirQuality;
        //
        //
        // // read json string to Buffer
        //
        // const output = [];
        // const getAirQualityDocs = new Promise(function(resolve, reject) {
        //
        // });
        // for await (let doc of docs) {
        //     const CID = doc.hash;
        //
        //     const a = await ipfs.cat(CID)
        //     console.log(a)
        //
        //     output.push(jsonFile);
        // }
        //
        // return output
    },
    airQualityList: async ({names, orderBy}) => {
        const LIMIT = 1000;
        let data = [];
        try {
            const list = await textileAirQuality.files.list(threadConfig[AIR_QUALITY].id, "", LIMIT);

            if (list !== undefined) {
                for await (let item of list.items) {
                    const buf = await textileAirQuality.blocks.fileContent(item.block);
                    const str = String.fromCharCode.apply(null, new Uint8Array(buf));
                    data.push(JSON.parse(str))
                }
            }
        }catch (e) {
            if(e.message === "Not Found") {
                console.log("airQuality not found")
            }
        }

        let uniqueAirQualityNames = [];

        if (names && names.length) {
            uniqueAirQualityNames = names;
        } else {
            const map = new Map();
            for (const item of data) {
                if(!map.has(item.name)){
                    map.set(item.name, true);    // set any value to Map
                    uniqueAirQualityNames.push(item.name);
                }
            }
        }
        let filtr = []
        console.log(uniqueAirQualityNames)
        for (let i = 0; i < uniqueAirQualityNames.length; i++) {
            const output = data.filter(item => item.name === uniqueAirQualityNames[i]);

            filtr.push(...output.sort((a,b) => {
                return new Date(b.time) - new Date(a.time)
            }));
        }
        // for (let i = 0; i < uniqueAirQualityNames.length; i++) {
        //     data.filter((data) => data.name === uniqueAirQualityNames[i]);
        // }
        //
        // if(orderBy === "TIME") {
        //     data.sort((a,b) => {
        //         return new Date(b.time) - new Date(a.time)
        //     })
        // }

        console.log(`Data length: ${data.length}`);

        return filtr
    },
    cushion: async () => {
        const LIMIT = 1000;
        let data = [];
        try {
            const list = await textileCushion.files.list(threadConfig[CUSHION].id, "", LIMIT);

            if (list !== undefined) {
                for await (let item of list.items) {
                    const buf = await textileCushion.blocks.fileContent(item.block);
                    const str = String.fromCharCode.apply(null, new Uint8Array(buf));
                    data.push(JSON.parse(str))
                }
            }
        }catch (e) {
            if(e.message === "Not Found") {
                console.log("airQuality not found")
            }
        }
        console.log(`Data length: ${data.length}`);

        return data[0]
    },
    cushionList: async () => {
        const LIMIT = 1000;
        let data = [];
        try {
            const list = await textileCushion.files.list(threadConfig[CUSHION].id, "", LIMIT);

            if (list !== undefined) {
                for await (let item of list.items) {
                    const buf = await textileCushion.blocks.fileContent(item.block);
                    const str = String.fromCharCode.apply(null, new Uint8Array(buf));
                    data.push(JSON.parse(str))
                }
            }
        }catch (e) {
            if(e.message === "Not Found") {
                console.log("airQuality not found")
            }
        }
        console.log(`Data length: ${data.length}`);

        return data
    },

    energyMonitor: async () => {
        const LIMIT = 1000;
        let data = [];
        try {
            const list = await textileEnergyMonitor.files.list(threadConfig[ENERGY_MONITOR].id, "", LIMIT);

            if (list !== undefined) {
                for await (let item of list.items) {
                    const buf = await textileEnergyMonitor.blocks.fileContent(item.block);
                    const str = String.fromCharCode.apply(null, new Uint8Array(buf));
                    data.push(JSON.parse(str))
                }
            }
        }catch (e) {
            if(e.message === "Not Found") {
                console.log("airQuality not found")
            }
        }
        console.log(`Data length: ${data.length}`);

        data.sort((a,b) => {
            return new Date(b.time) - new Date(a.time)
        });

        return data[0]
    },
    energyMonitorList: async ({orderBy}) => {
        const LIMIT = 1000;
        let data = [];
        try {
            const list = await textileEnergyMonitor.files.list(threadConfig[ENERGY_MONITOR].id, "", LIMIT);

            if (list !== undefined) {
                for await (let item of list.items) {
                    const buf = await textileEnergyMonitor.blocks.fileContent(item.block);
                    const str = String.fromCharCode.apply(null, new Uint8Array(buf));
                    data.push(JSON.parse(str))
                }
            }
        }catch (e) {
            if(e.message === "Not Found") {
                console.log("airQuality not found")
            }
        }

        if(orderBy === "TIME") {
            data.sort((a,b) => {
                return new Date(b.time) - new Date(a.time)
            })
        }

        return data
    },
    energyApplianceMonitor: async () => {
        const LIMIT = 1000;
        let data = [];
        try {
            const list = await textileEnergyAppMonitor.files.list(threadConfig[ENERGY_APPLIANCE_MONITOR].id, "", LIMIT);

            if (list !== undefined) {
                for await (let item of list.items) {
                    const buf = await textile5.blocks.fileContent(item.block);
                    const str = String.fromCharCode.apply(null, new Uint8Array(buf));
                    data.push(JSON.parse(str))
                }
            }
        }catch (e) {
            if(e.message === "Not Found") {
                console.log("airQuality not found")
            }
        }
        console.log(`Data length: ${data.length}`);

        data.sort((a,b) => {
            return new Date(b.time) - new Date(a.time)
        });

        return data[0]
    },
    sleep: async ({ name, startDate, endDate }) => {
        const LIMIT = 1000;
        let data = [];
        try {
            const list = await textileSleep.files.list(threadConfig[SLEEP].id, "", LIMIT);

            if (list !== undefined) {
                for await (let item of list.items) {
                    const buf = await textileSleep.blocks.fileContent(item.block);
                    const str = String.fromCharCode.apply(null, new Uint8Array(buf));
                    data.push(JSON.parse(str))
                }
            }
        }catch (e) {
            if(e.message === "Not Found") {
                console.log("airQuality not found")
            }
        }

        // const startDate = "2019-05-21T14:03:00Z";
        // const endDate = "2019-05-21T14:03:00Z";


        // const filteredDocs = data.filter((item) => {
        //     return new Date(startDate) <= new Date(item.startDate) && new Date(item.endDate) <= new Date(endDate);
        // });

        const output =  {
            "name": name ? name : 'smartWatch01',
            "user": "alex",
            "address": "kist-l1",
            "room": "L8321",
            "location": "On the table",
            "sleepAnalysis": data
        };

        return output;

    },
    smartTable: async () => {
        return {
            "name": "Foobot00",
            "user": "jonghoLee",
            "address": "kist-l1",
            "room": "L8321",
            "location": "On the table",
            "time": "2017-05-30T18:54:20+09:00",
            "foodList": ["kimchi", "rice", "driedSeaWeed"],
            "caloryList": ["40kcal", "250kcal", "30kcal"],
            "snapShot": "https://schema.iot.webizing.org/pictures/20180826"
        }
    },
    smartWatch: async ({ name, startDate, endDate }) => {
        const LIMIT = 1000;
        let stepCount = [];
        try {
            const list = await textileStepCount.files.list(threadConfig[HEA].id, "", LIMIT);

            if (list !== undefined) {
                for await (let item of list.items) {
                    const buf = await textileStepCount.blocks.fileContent(item.block);
                    const str = String.fromCharCode.apply(null, new Uint8Array(buf));
                    stepCount.push(JSON.parse(str))
                }
            }
        }catch (e) {
            if(e.message === "Not Found") {
                console.log("stepCount not found")
            }
        }

        let heartRate = [];
        try {
            const list = await textileHeartRate.files.list(threadConfig[SLEEP].id, "", LIMIT);

            if (list !== undefined) {
                for await (let item of list.items) {
                    const buf = await textileHeartRate.blocks.fileContent(item.block);
                    const str = String.fromCharCode.apply(null, new Uint8Array(buf));
                    heartRate.push(JSON.parse(str))
                }
            }
        }catch (e) {
            if(e.message === "Not Found") {
                console.log("heartRate not found")
            }
        }

        let standHour = [];
        try {
            const list = await textileStandHour.files.list(threadConfig[SLEEP].id, "", LIMIT);

            if (list !== undefined) {
                for await (let item of list.items) {
                    const buf = await textileStandHour.blocks.fileContent(item.block);
                    const str = String.fromCharCode.apply(null, new Uint8Array(buf));
                    standHour.push(JSON.parse(str))
                }
            }
        }catch (e) {
            if(e.message === "Not Found") {
                console.log("standHour not found")
            }
        }

        let exerciseTime = [];
        try {
            const list = await textileExerciseTime.files.list(threadConfig[SLEEP].id, "", LIMIT);

            if (list !== undefined) {
                for await (let item of list.items) {
                    const buf = await textileExerciseTime.blocks.fileContent(item.block);
                    const str = String.fromCharCode.apply(null, new Uint8Array(buf));
                    exerciseTime.push(JSON.parse(str))
                }
            }
        }catch (e) {
            if(e.message === "Not Found") {
                console.log("exerciseTime not found")
            }
        }
        // const client = await MongoClient.connect('mongodb://localhost:27017', { useNewUrlParser: true });

        // const db = client.db('k-log-iot');

        // const docsExT = await db.collection(constants.EXERCISE_TIME).find({name: name}).toArray();
        // const docsSH = await db.collection(constants.STAND_HOUR).find({name: name}).toArray();
        // const docsSC = await db.collection(constants.STEP_COUNT).find({name: name}).toArray();
        // const docsHR = await db.collection(constants.HEART_RATE).find({name: name}).toArray();

        // const filteredDocsExT= docsExT.filter((item) => {
        //     return new Date(startDate) <= new Date(item.startDate) && new Date(item.endDate) <= new Date(endDate);
        // });
        // const filteredDocsSH= docsSH.filter((item) => {
        //     return new Date(startDate) <= new Date(item.startDate) && new Date(item.endDate) <= new Date(endDate);
        // });
        // const filteredDocsSC= docsSC.filter((item) => {
        //     return new Date(startDate) <= new Date(item.startDate) && new Date(item.endDate) <= new Date(endDate);
        // });
        // const filteredDocsHR= docsHR.filter((item) => {
        //     return new Date(startDate) <= new Date(item.startDate) && new Date(item.endDate) <= new Date(endDate);
        // });

        return {
            "name": name ? name : 'smartWatch01',
            "user": "alex",
            "address": "kist-l1",
            "room": "L8321",
            "location": "On the table",
            "stepCount": stepCount,
            "heartRate":  heartRate,
            "exerciseTime": exerciseTime,
            "standHour": standHour
        }
    },
    ipCamera: async () => {
        const LIMIT = 1000;
        let data = [];
        try {
            const list = await textileIPCamera.files.list(threadConfig[IP_CAMERA].id, "", LIMIT);

            if (list !== undefined) {
                for await (let item of list.items) {
                    const buf = await textileIPCamera.blocks.fileContent(item.block);
                    const str = String.fromCharCode.apply(null, new Uint8Array(buf));
                    data.push(JSON.parse(str))
                }
            }
        }catch (e) {
            if(e.message === "Not Found") {
                console.log("airQuality not found")
            }
        }
        console.log(`Data length: ${data.length}`);

        data.sort((a,b) => {
            return new Date(b.time) - new Date(a.time)
        });

        return data[0]
    },
    ipfsCamera: async () => {
        const LIMIT = 1000;
        let data = [];
        try {
            const list = await textileIPFSCamera.files.list(threadConfig[IPFS_CAMERA].id, "", LIMIT);

            if (list !== undefined) {
                for await (let item of list.items) {
                    const buf = await textileIPFSCamera.blocks.fileContent(item.block);
                    const str = String.fromCharCode.apply(null, new Uint8Array(buf));
                    data.push(JSON.parse(str))
                }
            }
        }catch (e) {
            if(e.message === "Not Found") {
                console.log("airQuality not found")
            }
        }
        console.log(`Data length: ${data.length}`);

        data.sort((a,b) => {
            return new Date(b.time) - new Date(a.time)
        });

        return data[0]
    }
};

module.exports = root;
