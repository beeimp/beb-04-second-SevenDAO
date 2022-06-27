import { Router } from "express";
import clientPromise from "../../lib/mongodb.js";
import jwtObj from "../../lib/jwtObj.js";
import { ObjectId } from "mongodb";
import { sendToken } from "../../lib/tokenLib.js";


// 하드코딩파트?
const postsDBName = 'postsDB';
const postsCollectionName = 'posts';
const usersDBName = 'usersDB';
const usersCollectionName = 'users';
//

const postsRouter = Router();

postsRouter.get('/', async (req, res) => {
    const { postId } = req.query;
    if (postId) {
        try {
            const myClient = await clientPromise;
            // const myRes = await myClient.db(postsDBName).collection(postsCollectionName).find({_id:ObjectId("62b3dbcf3e2365e124a910ec")}).toArray();
            const myRes = await myClient.db(postsDBName).collection(postsCollectionName).find({ _id: ObjectId(postId) }).toArray();
            console.log(myRes);
            if (myRes.length > 0) {
                res.send(myRes[0]);
            }
            else res.send({ message: "error" })
        } catch (err) { res.status(400).send({ message: "error" }); }
    }
    else res.send({ message: 'wrong access' });
})


postsRouter.post('/', async (req, res) => {

    try {
        console.log(req.body, req.cookies);
        const username = jwtObj.jwtVerify(req.cookies?.jwt).username;
        console.log(username);        //result { username: '12', iat: 1655952666, exp: 1655956266 }
        if (username === req.body?.username) {
            const myClient = await clientPromise;
            // if((await myClient.db(postsDBName).collection(postsCollectionName).find({ _id: req.body?._id }).toArray()).length > 0) {res.send({message : 'error'}); return;}
            // req.body?._id 

            // const userInfo = await myClient.db(usersDBName).collection(usersCollectionName).find({username:123}).toArray()     
            // console.log(userInfo);
            // /*[
            //     {
            //       _id: new ObjectId("62b3d51be9e1b2c224d32a97"),
            //       username: '12',
            //       email: '2',
            //       password: '3',
            //       address: '0x256c6a3452e9250182066cab1e22e032a1f92a9d',
            //       privatekey: '54a40333cde6169a3b9c8d511af7d5985e4290725a1113f2557ad6bb9733f1b1'
            //     }
            //   ] 
            //   ,
            //    []       //fail
            //   */
            // if(userInfo.length > 0){
            // }
            const { username, title, contents, tag, } = req.body;
            let dbContent = { username: username, title: title, contents: contents, tag: tag };
            dbContent['created_date'] = new Date().getTime();
            // modified 부분    .... 나중에 바뀔듯한 코드부분.
            dbContent['modified_date'] = dbContent['created_date'];
            const insertRes = await myClient.db(postsDBName).collection(postsCollectionName).insertOne(dbContent);
            console.log(insertRes);

            if (insertRes.acknowledged === true) {

                // 토큰을 주는 파트.
                // create a filter for a movie to update
                const filter = { username: username };
                // this option instructs the method to create a document if no documents match the filter
                const options = { upsert: true };
                // create a document that sets the plot of the movie
                const updateUser = {
                    $inc: {
                        token: 1
                    },
                };

                await myClient.db(usersDBName).collection(usersCollectionName).updateOne(filter,updateUser,options);
                res.send({ message: "ok" });
            }
            else res.send({ message: "error" });
        }
        else res.send({ message: "error" });
    } catch (err) { res.send({ message: "error" }) }



})




export default postsRouter;