import express from 'express'
import clientPromise from "../../lib/mongodb.js";
import jwtObj from "../../lib/jwtObj.js";


// 하드코딩파트?
const postsDBName = 'postsDB';
const postsCollectionName = 'posts';

// routers
import postRouter from './post.js'
import commentRouter  from './comment.js'

// url : /post/
const router = express.Router();



router.get('/', async (req,res)=>{
    console.log(req.query);
    const {pageNum, count } = req.query;
    // 이름 바꾸는 부분
    const pageNumber = parseInt(pageNum);
    const nPerPage = parseInt(count);

    // db query
    const myClient = await clientPromise;
    const dbQueryRes = await myClient.db(postsDBName).collection(postsCollectionName).find()
        .skip(pageNumber > 0 ? ( ( pageNumber - 1 ) * nPerPage ) : 0)
        .sort({create_date:1})
        .limit(nPerPage)
        .toArray();

    res.status(200).send(dbQueryRes.map(obj=> {
        obj._id = obj._id.toString();
        return obj
    }))
    
    console.log(dbQueryRes[0]._id?.toString());

    // res.status(200).send('hi');  

});


router.use('/post', postRouter);
router.use('/comment', commentRouter);
// export default {
//     index: router.get('/', (req,res)=>{console.log(`get from /posts `); res.status(200).send('hi')  })
//     , posts : postRouter
    
// }

export default router;