import express from "express";
import clientPromise from "../lib/mongodb.js";
import jwtObj from "../lib/jwtObj.js";

// 하드코딩파트?
const dbName = 'usersDB';
const collectionName = 'users';
//

const signinRouter = express.Router();

signinRouter.get('/', (req,res)=>{console.log('get from signin'); res.send('signin')})

signinRouter.post('/', (req, res) => {
    (async () => {
        const myClient = await clientPromise;
        const { username, password } = req.body;
        const ret = await myClient.db(dbName).collection(collectionName).find({ username: username, password: password }).toArray();   // const ret = await myClient.db().admin().listDatabases()?.then(obj=>obj?.databases);
        console.log(ret);
        if (ret.length === 0) res.json({message: "login fail"});
        else {
            //
            const jwtStr = jwtObj.jwtSign({ username: username });
            res.cookie("jwt",jwtStr);
            res.json({message: 'login success'});
            
        }
    })();
})

export default signinRouter;