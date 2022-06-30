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
  const queryKeys = Object.keys(req.query);
  if (queryKeys.length > 1) { res.send({ message: 'wrong access' }); return; }
  if (req.query?.postId !== undefined) {
    try {
      // const jwt = jwtObj.jwtVerify(req.cookies?.jwt);
      // console.log(jwt);

      const myClient = await clientPromise;
      const { postId } = req.query;
      console.log(postId);
      const findRes = await myClient.db(commentsDBName).collection(commentsCollectionName).find({ postId: postId }).toArray();
      // console.log(findRes);

      // if (insertRes.acknowledged === true) res.send({ message: "ok" });
      res.send(findRes);

    }
    catch (err) { res.send({ message: "error" }); }
  }
  if (req.query?.username !== undefined) {
    try {
      // const jwt = jwtObj.jwtVerify(req.cookies?.jwt);
      // console.log(jwt);
      const username = req.query.username;
      // if(jwt.username !== username) { res.send({message : 'wrong access'}); return; }
      const myClient = await clientPromise;
      const findRes = await myClient.db(commentsDBName).collection(commentsCollectionName).find({ username: username }).toArray();
      res.send(findRes);
    } catch (err) { res.send({ message: 'error!' }) }
  }
})



export default commentsRouter