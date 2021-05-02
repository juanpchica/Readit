import {Request,Response, Router} from 'express'
import Post from '../entities/Post';
import Sub from '../entities/Sub';
import auth from '../middlewere/auth';

const createPost = async (req:Request, res:Response) => {

    const {title,body,sub} = req.body;

    if(title.trim() === "") return res.status(400).json({title:"Title must not be empty"});
    
    // Get the user from auth
    const user = res.locals.user;

    try{

        // find sub
        const subRecord = await Sub.findOneOrFail({ name: sub })
        
        //Create new post with user
        const post = new Post({ title, body, user, sub: subRecord })
        
        await post.save();

        return res.json(post);
    }catch(err){
        console.log(err);
        return res.status(500).json({ error: 'Something went wrong' })
    }
}

const getPosts = async(_:Request,res:Response) => {
    
    try{
        const posts = await Post.find({
            order: {'createdAt':'DESC'}
        });

        return res.status(200).json(posts);
    }catch(err){
        console.log('Something went wrong!!');
        return res.json({error:"Something went wrong"});
    }
}

const getPost = async (req:Request,res:Response) => {
    const {identifier,slug} = req.params;
    try {
        const post = await Post.findOneOrFail({identifier,slug},{relations:['sub']});
        return res.json(post);

    } catch (error) {
        console.log(error);
        return res.status(404).json({error:"Post not found!"})
    }
}


const router = Router();

router.post("/",auth,createPost);
router.get("/",getPosts);
router.get("/:identifier/:slug",getPost);

export default router;