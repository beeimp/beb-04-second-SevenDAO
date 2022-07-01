import { Router } from "express";
import clientPromise from "../lib/mongodb.js";

//lib
import jwtObj from "../lib/jwtObj.js";
import wallet from "../lib/wallet.js";

const signupRouter = Router();

// 하드코딩파트?
const dbName = 'usersDB';
const collectionName = 'users';
// 가입시 주는 토큰 개수
const numSignUpToken = 10;
//
//email regex
const emailRegex = /^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/ ;



signupRouter.get('/', (req, res) => { res.send('signup') })


signupRouter.post('/', (req, res) => {
    (async () => {
        const myClient = await clientPromise;
        const { username, email, password } = req.body;
        const ret = await myClient.db(dbName).collection(collectionName).find({ username: username }).toArray();   
        // const ret = await myClient.db().admin().listDatabases()?.then(obj=>obj?.databases);
        // 이메일 유효성
        if ( email.match(emailRegex) === null ) {res.send({message : 'email is not valid'}); return;}
        //
        if (ret.length > 0) res.json({message: "signup fail"});
        else {
            // db 저장 파트
            const jwtStr = jwtObj.jwtSign({username: username});
            res.cookie('jwt',jwtStr);
            // console.log("signup wallet : ",await wallet(username));
            const { address, privatekey } = await wallet(username);
            myClient.db(dbName).collection(collectionName).insertOne({ username: username, email: email, password: password, address:address, privatekey: privatekey, token: numSignUpToken });
            //
            res.json({message : "signup success"});
            
        }
    })();
})

export default signupRouter;