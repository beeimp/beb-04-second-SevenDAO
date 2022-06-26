import e, { Router } from "express";
import clientPromise from "../../lib/mongodb.js";
import jwtObj from "../../lib/jwtObj.js";


// 하드코딩파트?
const postsDBName = 'postsDB';
const postsCollectionName = 'posts';
const usersDBName = 'usersDB';
const usersCollectionName = 'users';
const commentsDBName = 'commentsDB';
const commentsCollectionName = 'comments';
//

const commentsRouter = Router();

commentsRouter.get('/', async (req, res) => {
    console.log(req.query);
    /*
      { postId: '123' }
    */
    try {
        // const jwt = jwtObj.jwtVerify(req.cookies?.jwt);
        // console.log(jwt);

        const myClient = await clientPromise;
        const { postId } = req.query;
        console.log(postId);
        const findRes = await myClient.db(commentsDBName).collection(commentsCollectionName).find({ postId : postId }).toArray();
        // console.log(findRes);

        // if (insertRes.acknowledged === true) res.send({ message: "ok" });
        res.send(findRes);

    }
    catch (err) { res.send({ message: "error" }); }

})



export default commentsRouter