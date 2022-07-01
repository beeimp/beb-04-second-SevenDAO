import express from 'express'

import signupRouter from './signup.js'
import singinRouter from './signin.js'
import verifyRouter from './verify.js'
import postsRouter from './posts/index.js'
import tokenRouter from './token/index.js'
import mypageRouter from './mypage.js'
import searchRouter from './search.js'


const routert = express.Router();


export default {
    index: routert.get('/', (req,res)=>{ res.status(200).send('hi')  })
    , signup : signupRouter
    , signin : singinRouter
    , verify : verifyRouter
    , posts : postsRouter
    , token : tokenRouter
    , mypage : mypageRouter
    , search : searchRouter
    
}