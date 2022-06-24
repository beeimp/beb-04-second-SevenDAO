import express from 'express'

import signupRouter from './signup.js'
import singinRouter from './signin.js'
import verifyTestRouter from './verifyTest.js'
import postsRouter from './posts/index.js'


const routert = express.Router();


export default {
    index: routert.get('/', (req,res)=>{console.log(`get from / `); res.status(200).send('hi')  })
    , signup : signupRouter
    , signin : singinRouter
    , verifyTest : verifyTestRouter
    , posts : postsRouter
    
}