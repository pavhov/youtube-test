import { Db } from "mongodb";

const MongoClient = require('mongodb').MongoClient;

import Debug, { IDebugger } from "debug";

let debug: IDebugger = Debug(`${process.env.NODE_NAME}`);

const url = process.env.MONGODB;

const dbName = 'youtube';

const client = new MongoClient(url, { useNewUrlParser: true });

export const DB = async (): Promise<Db> => {
    return client.connect().then(() => {
        debug("Connected successfully to server");
        return client.db(dbName);
    }).catch((reason: Error) => {
        debug("Mongodb connect is crashed", reason);
    });
};
