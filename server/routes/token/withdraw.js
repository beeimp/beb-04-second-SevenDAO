import jwtObj from "../../lib/jwtObj.js"
import clientPromise from "../../lib/mongodb.js";
import { sendToken } from "../../lib/tokenLib.js";


// 하드코딩파트?
const dbName = 'usersDB';
const collectionName = 'users';
// 수수료
const trxFee = 1;
//

export default async (req, res) => {
    console.log(req.body);
    const { address: toAddress, value } = req.body;
    if (toAddress === undefined || value === undefined) { res.send({ message: 'wrong input value' }); return; }
    if (value <= 0) { res.send({ message: 'value must above 0' }); return; }
    try {
        let jwt = req.cookies?.jwt;
        const myJwt = jwtObj.jwtVerify(jwt);
        const fromUsername = myJwt.username;

        const myClient = await clientPromise;
        const fromUser = await myClient.db(dbName).collection(collectionName).find({ username: fromUsername }).toArray();
        // const toUser = await myClient.db(dbName).collection(collectionName).find({ username: toUsername }).toArray();
        // console.log(typeof fromUser[0].token, typeof value);
        console.log(fromUser[0]);
        if (fromUser[0].token < (value +trxFee)) {
            res.send({ message: 'you do not have enough tokens ' });
            return;
        }
        // console.log(toUser[0].address, fromUser[0].privatekey);
        const trxRes = await sendToken(value, toAddress);
        if (trxRes) {
            await myClient.db(dbName).collection(collectionName).updateOne({ username: fromUsername }, { $inc: { token: -(value+trxFee) },}, {upsert : true});
            
            res.send({ message: 'transaction success!' });
            return;
        }
        res.send({ message: 'trx error' });


    } catch (e) { res.send({ message: e }) }
}





// import { Router } from "express";

// const balanceRouter = Router();

// balanceRouter.get('/',(req,res)=>{
//     res.send('hi');
// })


// export default balanceRouter;