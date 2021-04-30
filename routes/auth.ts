
import { validate } from 'class-validator';
import {Request,Response,Router} from 'express'
import { User } from '../src/entities/User';

const register = async (req: Request,res: Response) => {
    const { email, username, password } = req.body;

    //Create a new user in db
    try{
        // TODO: Validate data

        // TODO: Create user
        const user = new User({email,username,password});

        //Validate error from user passed
        const errors = await validate(user);

        if(errors.length >0) return res.status(400).json({errors});

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