import express from "express";
// import clientPromise from "../lib/mongodb.js";
import jwtObj from "../lib/jwtObj.js";

// 하드코딩파트?
const dbName = 'usersDB';
const collectionName = 'users';
//

const verifyTestRouter = express.Router();

verifyTestRouter.get('/', (req,res)=>{
    console.log('get from verifyTest'); 
    const {jwt} = req.cookies;
    // console.log(jwtObj.jwtVerify(jwt));         //{ name: '4', iat: 1655871064, exp: 1655874664 }       // JsonWebTokenError: invalid signature
    try{
        const retObj = jwtObj.jwtVerify(jwt);
        res.send({message : "ok"});
    } catch(e) { res.send({message: "fail"});}

    // console.log(req.cookies);

})

// signinRouter.post('/', (req, res) => {
//     (async () => {
//         const myClient = await clientPromise;
//         const { username, password } = req.body;
//         const ret = await myClient.db(dbName).collection(collectionName).find({ username: username, password: password }).toArray();   // const ret = await myClient.db().admin().listDatabases()?.then(obj=>obj?.databases);
//         console.log(ret);
//         if (ret.length === 0) res.send('username or password are not correct. plz try again.');
//         else {
//             //
//             const jwtStr = jwtObj.jwtSign({ name: username });
//             res.cookie("jwt",jwtStr);
//             res.send('welcome user!');
            
//         }
//     })();
// })

export default verifyTestRouter;