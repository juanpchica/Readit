
import { validate } from 'class-validator';
import {Request,Response,Router} from 'express'
import { User } from '../src/entities/User';

import bcrypt from 'bcrypt';

const register = async (req: Request,res: Response) => {
    const { email, username, password } = req.body;

    //Create a new user in db
    try{

        let errors:any = {}

        // Validate data
        const usernameUser = await User.findOne({username});
        const emailUser = await User.findOne({email});

        if(usernameUser) errors.username = "Username is already taken";
        if(emailUser) errors.email = "Email is already taken";

        if(Object.keys(errors).length > 0){
            return res.status(400).json(errors);
        }

        // Create user
        const user = new User({email,username,password});

        //Validate error from user passed
        errors = await validate(user);
        if(errors.length >0) return res.status(400).json({errors});

        //User Persist to DB
        await user.save();

        // Return user
        return res.json(user);
    }catch(err){
        console.log(err)
        return res.status(500).json({error:"Something went wrong"});
    }
}

const login = async (req: Request, res:Response) => {

    const {username,password} = req.body;
    
    try{
        const user = await User.findOne({username});

        if(!user) return res.status(400).json({error:"Username not found"});

        //Validate if password matches with the exist one
        const passwordMatches = await bcrypt.compare(password,user.password);

        if(!passwordMatches) return res.status(401).json({password:"Password is incorrect!"})

        

    }catch(err){
        console.log(err);
    }
}

const router = Router()
router.post("/register",register);
router.post("/login",login);

export default router;