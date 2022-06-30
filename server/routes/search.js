import { Router } from "express";
import clientPromise from "../lib/mongodb.js";

const searchRouter = Router();

//db 이름 하드코딩
const postsDBName = 'postsDB';
const postsCollectionName = 'posts';
//

searchRouter.get('/', async (req,res)=>{
    // console.log(req.query);
    const { searchword, pageNum, count } = req.query;
    
    try{
    if( searchword !== undefined){
        const pageNumber = parseInt(pageNum);
        const nPerPage = parseInt(count);

        const myClient = await clientPromise;
        const dbQueryRes = await myClient.db(postsDBName).collection(postsCollectionName)
        .find({$or: [
            { title : { $regex : searchword, $options : 'i' } }
            , { username : { $regex : searchword, $options : 'i' } }
            , { content : { $regex : searchword, $options : 'i' } }
            , { tag : { $regex : searchword, $options : 'i' } }
        ]})
        .skip(pageNumber > 0 ? ((pageNumber - 1) * nPerPage) : 0)
        .sort({ created_date: -1 })
        .limit(nPerPage)
        .toArray();
        
        // console.log(dbQueryRes);
        res.send(dbQueryRes);
        return ;
    }
    res.send({message: 'query string error'});
    return;
    } catch (e) {res.send({messgage : e})}

})

export default searchRouter;