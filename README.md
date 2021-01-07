# webizing-td
Webizing Thing Description

The current repository is part of the TD project and represents the server side. The server part consists of: GraphQL API for obtaining the current state of the sensor, REST API represents a digital representation of the sensor in JSON-LD format, the database in which data about the current state of the sensor is stored. 
Each branch in the repository represents implementations of this project using different technologies for storing data(IPFS, OrbitDB, Textile, MongoDB) and the use of different sensors.

# Branches


# Requirements
node.js - v12

# Development

```bash
yarn install
yarn run dev:start
```

