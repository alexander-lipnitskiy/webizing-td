# Webizing Thing Description

The current repository is part of the TD project and represents the server side. The server part consists of: GraphQL API for obtaining the current state of the sensor, REST API represents a digital representation of the sensor in JSON-LD format, the database in which data about the current state of the sensor is stored. 
Each branch in the repository represents implementations of this project using different technologies for storing data(IPFS, OrbitDB, Textile, MongoDB) and the use of different sensors.

![alt text](https://github.com/alexander-lipnitskiy/webizing-td/blob/master/graph-ql.png)

# Branches


# Requirements
node.js - 12+
yarn - 1.19.1+
mongodb
ipfs


# Installation 
Clone current repository 
Use the package manager yarn to install modules.

```bash
yarn install
```

# Development

```bash
yarn run dev:start
```

# Production

```bash
yarn run dev:start
```
