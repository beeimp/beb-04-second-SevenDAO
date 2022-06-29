import jwtObj from "../lib/jwtObj.js"
import clientPromise from "../lib/mongodb.js";
import { getTOKENBalanceOf } from "../lib/tokenLib.js";

// 하드코딩파트?
const dbName = 'usersDB';
const collectionName = 'users';

//



export default async (req, res) => {
    const { jwt } = req.cookies;
    try {
        const myJwt = jwtObj.jwtVerify(jwt);
        const myClient = await clientPromise;
        const queryRes = await myClient.db(dbName).collection(collectionName).find({username:myJwt.username}).toArray();
        const contractToken = await getTOKENBalanceOf(queryRes[0].address);
        const {_id,password,privatekey,...resObj} = queryRes[0];
        console.log(queryRes, myJwt, resObj);
        resObj.token += contractToken;
        res.send(resObj);


    } catch (e) { res.send({ message: e }) }
}