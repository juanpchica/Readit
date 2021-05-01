import {Request,Response, Router} from 'express'
import { Post } from '../src/entities/Post';
import auth from '../src/middlewere/auth';

const createPost = async (req:Request, res:Response) => {

    const {title,body,sub} = req.body;

    if(title.trim() === "") return res.status(400).json({title:"Title must not be empty"});
    
    // Get the user from auth
    const user = res.locals.user;

    try{

        //TODO: find sub
        
        //Create new post with user
        const post = new Post({title,body,user,subName:sub});
        await post.save();

        return res.json(post);
    }catch(err){
        console.log(err);
        return res.status(500).json({ error: 'Something went wrong' })
    }
}

const router = Router();

router.post("/",auth,createPost);

export default router;