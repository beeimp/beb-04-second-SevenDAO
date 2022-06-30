import jwtObj from "../../lib/jwtObj.js"
import clientPromise from "../../lib/mongodb.js";
import { hasGasFee, sendEthGas, sendToken } from "../../lib/tokenLib.js";


// 하드코딩파트?
const dbName = 'usersDB';
const collectionName = 'users';
// 토큰 교환시 수수료
const trxFee = 10;
//

export default async (req, res) => {
    console.log(req.body);
    const { address: toAddress, value } = req.body;
    if (toAddress === undefined || value === undefined) { res.send({ message: 'wrong input value' }); return; }
    if (typeof value !== 'number') {res.send({message : 'wrong token count.'}); return;}
    if (value <= 0) { res.send({ message: 'value must above 0' }); return; }
    try {
        let jwt = req.cookies?.jwt;
        const myJwt = jwtObj.jwtVerify(jwt);
        const fromUsername = myJwt.username;

        const myClient = await clientPromise;
        const fromUser = await myClient.db(dbName).collection(collectionName).find({ username: fromUsername }).toArray();
        // const toUser = await myClient.db(dbName).collection(collectionName).find({ username: toUsername }).toArray();
        // console.log(typeof fromUser[0].token, typeof value);
        const isOurUser = await myClient.db(dbName).collection(collectionName).find({address: toAddress}).toArray();
        if(isOurUser.length > 0) {res.send({message : 'this address is our user. please use exchange api'}); return;}

        console.log(fromUser[0]);
        if (fromUser[0].token < (value +trxFee)) {
            res.send({ message: 'you do not have enough tokens ' });
            return;
        }
        // console.log(toUser[0].address, fromUser[0].privatekey);

        // if( ! await hasGasFee(fromUser[0].address) ) await sendEthGas(fromUser[0].address);
        const trxRes = await sendToken(value, toAddress);
        
        if (trxRes) {
            await myClient.db(dbName).collection(collectionName).updateOne({ username: fromUsername }, { $inc: { token: -(value+trxFee) },}, {upsert : true});
            
            res.send({ message: 'transaction success!' });
            return;
        }
        res.send({ message: 'trx error' });


    } catch (e) { res.send({ message: e }) }
}