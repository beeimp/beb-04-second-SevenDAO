import { Router } from "express";
import clientPromise from "../lib/mongodb.js";
import jwtObj from "../lib/jwtObj.js";

const signupRouter = Router();

// 하드코딩파트?
const dbName = 'nameDB';
const collectionName = 'name';
//

signupRouter.get('/', (req, res) => { console.log('get from signup'); res.send('signup') })


signupRouter.post('/', (req, res) => {
    (async () => {
        const myClient = await clientPromise;
        const { username, email, password } = req.body;
        const ret = await myClient.db(dbName).collection(collectionName).find({ username: username }).toArray();   // const ret = await myClient.db().admin().listDatabases()?.then(obj=>obj?.databases);
        if (ret.length > 0) res.json({message: "signup fail"});
        else {
            // db 저장 파트
            const jwtStr = jwtObj.jwtSign({username: username});
            res.cookie('jwt',jwtStr);
            myClient.db(dbName).collection(collectionName).insertOne({username: username, email: email, password: password});
            //
            res.json({message : "signup success"});
            
        }
    })();
})

export default signupRouter;