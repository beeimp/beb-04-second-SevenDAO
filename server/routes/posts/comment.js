import e, { Router } from "express";
import clientPromise from "../../lib/mongodb.js";
import jwtObj from "../../lib/jwtObj.js";


// 하드코딩파트?
const postsDBName = 'postsDB';
const postsCollectionName = 'posts';
const usersDBName = 'usersDB';
const usersCollectionName = 'users';
const commentsDBName = 'commentsDB';
const commentsCollectionName='comments';
//

const commentRouter = Router();

commentRouter.post('/', async (req,res)=>{
    console.log(req.body, req.query, );       
    /*{
        postId: '1',
        username: 'username',
        comment: 'comment',
        create_date: 1655642838,
        modified_date: 1655642838
      } 
      { postId: '123' }
    */
   try{
    const jwt = jwtObj.jwtVerify(req.cookies?.jwt);
    console.log(jwt);
    if(jwt.username === req.body?.username && req.query?.postId === req.body?.postId){
        const myClient = await clientPromise;
        
        const insertRes = await myClient.db(commentsDBName).collection(commentsCollectionName).insertOne(req.body); 
        // console.log(insertRes);
        
        if(insertRes.acknowledged === true)  res.send({message: "ok"});
        else res.send({message: "error"});
    }
    else res.send({message: "error"});
   } 
   catch (err) { res.send({message: "error"}); }
    
})



export default commentRouter