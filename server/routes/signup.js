import { Router } from "express";
import clientPromise from "../lib/mongodb.js";

//lib
import jwtObj from "../lib/jwtObj.js";
import wallet from "../lib/wallet.js";

const signupRouter = Router();

// 하드코딩파트?
const dbName = 'usersDB';
const collectionName = 'users';
//

signupRouter.get('/', (req, res) => { console.log('get from signup'); res.send('signup') })


signupRouter.post('/', (req, res) => {
    (async () => {
        const myClient = await clientPromise;
        const { username, email, password } = req.body;6
        const ret = await myClient.db(dbName).collection(collectionName).find({ username: username }).toArray();   // const ret = await myClient.db().admin().listDatabases()?.then(obj=>obj?.databases);
        if (ret.length > 0) res.json({message: "signup fail"});
        else {
            // db 저장 파트
            const jwtStr = jwtObj.jwtSign({username: username});
            res.cookie('jwt',jwtStr);
            // console.log("signup wallet : ",await wallet(username));
            const { address, privatekey } = await wallet(username);
            myClient.db(dbName).collection(collectionName).insertOne({ username: username, email: email, password: password, address:address, privatekey: privatekey });
            //
            res.json({message : "signup success"});
            
        }
    })();
})

export default signupRouter;