import jwtObj from "../../lib/jwtObj.js"
import clientPromise from "../../lib/mongodb.js";
import { getTOKENBalanceOf } from "../../lib/tokenLib.js";

// 하드코딩파트?
const dbName = 'usersDB';
const collectionName = 'users';
// 토큰 교환시 수수료 
// withdraw 랑 차이가 있어야 쓸듯? 수수료 줄이자.
const trxFee = 5;
//

export default async (req, res) => {
    // console.log(req.body);
    const { username: toUsername, value } = req.body;
    if (toUsername === undefined || value === undefined) { res.send({ message: 'wrong input value' }); return; }
    if (value <= 0) { res.send({ message: 'value must above 0' }); return; }
    try {
        let jwt = req.cookies?.jwt;
        const myJwt = jwtObj.jwtVerify(jwt);
        const fromUsername = myJwt.username;

        const myClient = await clientPromise;
        const fromUser = await myClient.db(dbName).collection(collectionName).find({ username: fromUsername }).toArray();
        // const toUser = await myClient.db(dbName).collection(collectionName).find({ username: toUsername }).toArray();
        const fromUserCtoken = getTOKENBalanceOf(fromUser[0].address);
        const fromUserTotalToken = fromUser[0].token + fromUserCtoken;
        // console.log(typeof fromUser[0].token, typeof value);
        // console.log(fromUser[0]);
        if (fromUserTotalToken < (value + trxFee)) {
            res.send({ message: 'you do not have enough tokens ' });
            return;
        }

        // const trxRes = await sendToken(value, toAddress);

        const trxRes = await myClient.db(dbName).collection(collectionName).updateOne({ username: fromUsername }, { $inc: { token: -(value + trxFee) }, }, { upsert: true })
            .then(r => {
                if (r.acknowledged === true) 
                    return myClient.db(dbName).collection(collectionName).updateOne({ username: toUsername }, { $inc: { token: value }, }, { upsert: true })
                                 .then(r=> r.acknowledged === true)
            })

        if(trxRes) { res.send({ message: 'transaction success!' }); return; }
        else res.send({message: 'trx error'});





    } catch (e) { res.send({ message: e }) }
}