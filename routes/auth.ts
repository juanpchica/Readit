
import {Request,Response,Router} from 'express'
import { User } from '../src/entities/User';

const register = (req: Request,res: Response) => {
    const { email, username, password } = req.body;

    //Create a new user in db
    try{
        // TODO: Validate data

        // TODO: Create user
        const user = new User({email,username,password});
        user.save();

        // TODO: Return user
        return res.json(user);
    }catch(err){
        console.log(err)
        return res.status(500).json({error:"Something went wrong"});
    }
}

const router = Router()
router.post("/register",register);

export default router;