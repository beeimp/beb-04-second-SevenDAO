import express from 'express'
import clientPromise from "../../lib/mongodb.js";
import jwtObj from "../../lib/jwtObj.js";


// 하드코딩파트?
const postsDBName = 'postsDB';
const postsCollectionName = 'posts';

// routers
import balanceRouter from './balance.js'
import withdrawRouter from './withdraw.js';

// url : /post/
const router = express.Router();


router.use('/balance', balanceRouter);
router.use('/withdraw', withdrawRouter);



export default router;