import {MongoClient} from 'mongodb'
import dotenv from 'dotenv'
dotenv.config();

const uri = process.env.MONGO_URI;
const options = {};

let client = new MongoClient(uri, options);
let clientPromise = client.connect();

export default clientPromise;
