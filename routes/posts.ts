import {Request,Response, Router} from 'express'
import auth from '../src/middlewere/auth';

const createPost = (req:Request, res:Response) => {

    const {title,body,subName} = req.body;

    if(title.trim() === "") return res.status(400).json({title:"Title must not be empty"});
    
    try{
        // Get the user from auth
        const user = res.locals.user;


    }catch(err){
        console.log(err);
        return res.status(500).json({ error: 'Something went wrong' })
    }
}

const router = Router();

router.post("/",auth,createPost);

export default router;