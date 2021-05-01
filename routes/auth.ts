
import { isEmpty,validate } from 'class-validator';
import {Request,Response,Router} from 'express'
import { User } from '../src/entities/User';

import bcrypt from 'bcrypt';
import  jwt  from "jsonwebtoken";
import cookie from "cookie";

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

        let errors: any = {};
        if(!username || username == "") errors.username = "Username must not be empty";
        if(isEmpty(password)) errors.password = "Password must not be empty";

        if(Object.keys(errors).length > 0) return res.status(400).json(errors);

        const user = await User.findOne({username});

        if(!user) return res.status(400).json({error:"Username not found"});

        //Validate if password matches with the exist one
        const passwordMatches = await bcrypt.compare(password,user.password);

        if(!passwordMatches) return res.status(401).json({password:"Password is incorrect!"})

        //Create token for user logged
        const token = jwt.sign({username},process.env.JWT_TOKEN);

        //Set my cookie with the token created
        res.set('Set-Cookie',cookie.serialize("token",token,{
            httpOnly:true,
            secure:process.env.NODE_ENV === "production",
            sameSite:'strict',
            maxAge:3600,
            path:"/"
        }))

        return res.status(200).json(user);

    }catch(err){
        console.log(err);
    }
}

const me = async (req:Request,res:Response)=>{
    try{
        const token = req.cookies.token;
        if(!token) throw new Error('Unauthenticated')

        //Verified if token is equal to the already created
        const { username } :any = jwt.verify(token,process.env.JWT_TOKEN);
        
        const user = await User.findOne({username});

        if(!user) throw new Error('Unauthenticated')

        return res.json(user);

    }catch(err){
        console.log(err);
        return res.status(401).json({error:"Unauthenticated"});
    }
    
}

const router = Router()
router.post("/register",register);
router.post("/login",login);
router.get("/me",me);

export default router;