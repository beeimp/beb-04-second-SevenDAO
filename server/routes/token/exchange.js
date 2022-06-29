import jwtObj from "../../lib/jwtObj.js"
import clientPromise from "../../lib/mongodb.js";
import { getTOKENBalanceOf, sendToken } from "../../lib/tokenLib.js";

// 하드코딩파트?
const dbName = 'usersDB';
const collectionName = 'users';
// 토큰 교환시 수수료 
// withdraw 랑 차이가 있어야 쓸듯? 수수료 줄이자.
const trxFee = 5;
// 컨트랙트 오너 퍼블릭 주소
const contractOwnerPubKey = '0x384b2E84f40551F19c6C2Ce97b6C1991e3991088';
//

export default async (req, res) => {
    console.log(req.body);
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
        const totalFee = (value + trxFee);

        if (fromUserTotalToken < totalFee) {
            res.send({ message: 'you do not have enough tokens ' });
            return;
        }

        // const trxRes = await sendToken(value, toAddress);
        // if(fromUser[0].token >= totalFee){

        // fromUserCtoken 이 있는 경우
        if (fromUserCtoken) {
            const residue = totalFee - fromUserCtoken > 0 ? totalFee - fromUserCtoken : 0;
            if (residue > 0) {
                const lastTrxRes = await Promise.all([
                    sendToken(fromUserCtoken, contractOwnerPubKey, fromUser[0].privatekey),
                    myClient.db(dbName).collection(collectionName).updateOne({ username: fromUsername }, { $inc: { token: -residue }, }, { upsert: true })])

                if (lastTrxRes[0] === true && lastTrxRes[1].acknowledged === true) {
                    res.send({ message: 'transaction success!' });
                    return;
                }
            }
            else {
                const lastTrxRes = new Promise.all([
                    sendToken(totalFee, contractOwnerPubKey, fromUser[0].privatekey),
                    // sendToken(value, toAddress)
                    myClient.db(dbName).collection(collectionName).updateOne({ username: toUsername }, { $inc: { token: value  }, }, { upsert: true })
                ])

                if (lastTrxRes[0] === true && lastTrxRes[1].acknowledged === true) {
                    res.send({ message: 'transaction success!' });
                    return;
                }
            }
        }

        else {
                const lastTrx = new Promise.all([
                myClient.db(dbName).collection(collectionName).updateOne({ username: fromUsername }, { $inc: { token: -(value + trxFee) }, }, { upsert: true }),
                myClient.db(dbName).collection(collectionName).updateOne({ username: toUsername }, {$inc: {token: value}})
                ])
                if(lastTrx[0].acknowledged === true & lastTrx[1].acknowledged === true){
                    res.send({ message: 'transaction success!' }); return;
                }
                else  { res.send({message : 'transaction error'}); return; }
                
            
        }





    } catch (e) { res.send({ message: e }) }
}





// import { Router } from "express";

// const balanceRouter = Router();

// balanceRouter.get('/',(req,res)=>{
//     res.send('hi');
// })


// export default balanceRouter;