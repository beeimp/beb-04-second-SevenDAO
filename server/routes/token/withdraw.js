import jwtObj from "../../lib/jwtObj.js"
import clientPromise from "../../lib/mongodb.js";
import { sendToken, getTOKENBalanceOf } from "../../lib/tokenLib.js";


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
        if (fromUser.length > 1) { res.send({ message: 'db found multiple users' }); return; }

        // cToken 확인 및 전체 trx 가격 계산
        const fromUserCtoken = await getTOKENBalanceOf(fromUser[0].address);
        const totalFee = value + trxFee;
        //

        if ((fromUser[0].token + fromUserCtoken) < totalFee) {
            res.send({ message: 'you do not have enough tokens ' });
            return;
        }
        // 받는사람 사이트 유저인지 확인
        const isOurUser = await myClient.db(dbName).collection(collectionName).find({ address: toAddress }).toArray();
        if (isOurUser.length > 0) { res.send({ message: `this address is our site's user. please use exchange api` }); return; }
        // console.log(toUser[0].address, fromUser[0].privatekey);
        //

        // fromUserCtoken 이 있는 경우
        if (fromUserCtoken) {
            const residue = totalFee - fromUserCtoken > 0 ? totalFee - fromUserCtoken : 0;
            if (residue > 0) {
                const lastTrxRes = await Promise.all([
                    sendToken(fromUserCtoken, '0x384b2E84f40551F19c6C2Ce97b6C1991e3991088', fromUser[0].privatekey),
                    myClient.db(dbName).collection(collectionName).updateOne({ username: fromUsername }, { $inc: { token: -residue }, }, { upsert: true })])

                if (lastTrxRes[0] === true && lastTrxRes[1].acknowledged === true) {
                    res.send({ message: 'transaction success!' });
                    return;
                }
            }
            else {
                const lastTrxRes = new Promise.all([
                    sendToken(totalFee, '0x384b2E84f40551F19c6C2Ce97b6C1991e3991088', fromUser[0].privatekey),
                    sendToken(value, toAddress)
                ])

                if (lastTrxRes[0] === true && lastTrxRes[1] === true) {
                    res.send({ message: 'transaction success!' });
                    return;
                }
            }
        }

        else {
            const trxRes = await sendToken(value, toAddress);
            if (trxRes) {
                await myClient.db(dbName).collection(collectionName).updateOne({ username: fromUsername }, { $inc: { token: -(value + trxFee) }, }, { upsert: true });

                res.send({ message: 'transaction success!' });
                return;
            }
            res.send({ message: 'trx error' });
        }

    } catch (e) { res.send({ message: e }) }
}





// import { Router } from "express";

// const balanceRouter = Router();

// balanceRouter.get('/',(req,res)=>{
//     res.send('hi');
// })


// export default balanceRouter;