import { NextFunction, Request, Response, Router } from "express";
import { isEmpty } from "class-validator";
import { getRepository } from "typeorm";
import multer, { FileFilterCallback } from "multer";
import path from "path";

import User from "../entities/User";
import Sub from "../entities/Sub";
import auth from "../middlewere/auth";
import user from "../middlewere/user";
import Post from "../entities/Post";
import { makeid } from "../util/helper";
const createSub = async (req: Request, res: Response) => {
  const { name, title, description } = req.body;

  const user: User = res.locals.user;

  try {
    let errors: any = {};
    if (isEmpty(name)) errors.name = "Name must not be empty";
    if (isEmpty(title)) errors.title = "Title must not be empty";

    const sub = await getRepository(Sub)
      .createQueryBuilder("sub")
      .where("lower(sub.name) = :name", { name: name.toLowerCase() })
      .getOne();

    if (sub) errors.name = "Sub exists already";

    if (Object.keys(errors).length > 0) {
      throw errors;
    }
  } catch (err) {
    return res.status(400).json(err);
  }

  try {
    const sub = new Sub({ name, description, title, user });
    await sub.save();

    return res.json(sub);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

const getSubs = async (req: Request, res: Response) => {
  const name = req.params.name;

  try {
    const sub = await Sub.findOneOrFail({ name });

    //Sub was found, and now fetch data
    const posts = await Post.find({
      where: { sub },
      order: { createdAt: "DESC" },
      relations: ["comments", "votes"],
    });

    sub.posts = posts;

    //Validate if posts is from user logged
    if (res.locals.user) {
      sub.posts.forEach((e) => {
        e.setUserVote(res.locals.user);
      });
    }

    return res.json(sub);
  } catch (error) {
    console.log(error);
    return res.status(404).json({ sub: "Sub not found" });
  }
};

//Validate if own Sub
const ownSub = async (req: Request, res: Response, next: NextFunction) => {
  const user = res.locals.user;
  try {
    //Get info for that sub
    const sub = await Sub.findOneOrFail({ where: { name: req.params.name } });

    if (sub.username !== user.username) {
      return res.status(403).json({ error: "You dont own this sub" });
    }

    res.locals.sub = sub;

    return next(); //Return to the next middleware
  } catch (error) {
    console.log(error);
  }
};

//Multer middleware for image
const upload = multer({
  storage: multer.diskStorage({
    destination: "public/images",
    filename: (_, file, callback) => {
      const name = makeid(15);
      console.log(name + path.extname(file.originalname));
      callback(null, name + path.extname(file.originalname)); // e.g fdsafasd.jpg
    },
  }),
  fileFilter: (_, file: any, callback: FileFilterCallback) => {
    console.log(file);
    //Validate type image
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
      console.log("image uploading");
      callback(null, true);
    } else {
      callback(new Error("Not an image"));
    }
  },
});

const uploadSubImage = async (_: Request, res: Response) => {
  return res.json({ success: true });
};

const router = Router();

router.post("/", user, auth, createSub);
router.get("/:name", user, getSubs);
router.post(
  "/:name/image",
  user,
  auth,
  ownSub,
  upload.single("file"),
  uploadSubImage
);

export default router;
