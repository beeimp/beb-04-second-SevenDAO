import { getTOKENBalanceOf } from "../../lib/tokenLib.js"
import jwtObj from "../../lib/jwtObj.js"
import clientPromise from "../../lib/mongodb.js";


// 하드코딩파트?
const dbName = 'usersDB';
const collectionName = 'users';
//

export default async (req,res)=>{
    // console.log(req.cookies);
    try{
    let jwt = req.cookies?.jwt;
    const myJwt = jwtObj.jwtVerify(jwt);
    const username = myJwt.username;
    
    const myClient = await clientPromise;
    const myUser = await myClient.db(dbName).collection(collectionName).find({username:username}).toArray();

    if(myUser[0].token === undefined){
        res.send({token : 0});
        return;
    }
    res.send({token : myUser[0].token})

    } catch (e) {res.send({message : 'error'})}
}





// import { Router } from "express";

// const balanceRouter = Router();

// balanceRouter.get('/',(req,res)=>{
//     res.send('hi');
// })


// export default balanceRouter;