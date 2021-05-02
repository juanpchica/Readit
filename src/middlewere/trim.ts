import { NextFunction, Request,Response } from "express";

export default (req: Request, _: Response, next: NextFunction) => {
    const exceptions = ["password"];

    Object.keys(req.body).forEach((k)=>{
        if(!exceptions.includes(k) && typeof req.body[k] === "string"){
            req.body[k] = req.body[k].trim()
        }
    })

    next();
}