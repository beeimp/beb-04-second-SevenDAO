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
    const contractToken = await getTOKENBalanceOf(myUser[0].address);
        // console.log(contractToken);
    if(myUser[0].token === undefined){
        res.send({token : contractToken});
        return;
    }
    res.send({token : (myUser[0].token+contractToken)})

    } catch (e) {res.send({message : e})}
}





// import { Router } from "express";

// const balanceRouter = Router();

// balanceRouter.get('/',(req,res)=>{
//     res.send('hi');
// })


// export default balanceRouter;